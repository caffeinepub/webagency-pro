import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Types
  type Event = {
    id : Nat;
    title : Text;
    date : Time.Time;
    description : Text;
    location : Text;
    capacity : Nat;
    price : Nat;
    imageUrl : Text;
    category : Text;
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    eventId : Nat;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // State variables
  var nextEventId = 1;
  var nextBookingId = 1;

  let events = Map.empty<Nat, Event>();
  let bookings = Map.empty<Nat, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Compare modules for sorting
  module Event {
    public func compare(a : Event, b : Event) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Booking {
    public func compare(a : Booking, b : Booking) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Event Management (Admin only for create/update/delete, public for read)

  public shared ({ caller }) func createEvent(
    title : Text,
    date : Time.Time,
    description : Text,
    location : Text,
    capacity : Nat,
    price : Nat,
    imageUrl : Text,
    category : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create events");
    };

    let event : Event = {
      id = nextEventId;
      title;
      date;
      description;
      location;
      capacity;
      price;
      imageUrl;
      category;
    };

    events.add(nextEventId, event);
    nextEventId += 1;
  };

  public shared ({ caller }) func updateEvent(
    id : Nat,
    title : Text,
    date : Time.Time,
    description : Text,
    location : Text,
    capacity : Nat,
    price : Nat,
    imageUrl : Text,
    category : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update events");
    };

    switch (events.get(id)) {
      case (null) { Runtime.trap("Event not found") };
      case (_) {
        let updatedEvent : Event = {
          id;
          title;
          date;
          description;
          location;
          capacity;
          price;
          imageUrl;
          category;
        };

        events.add(id, updatedEvent);
      };
    };
  };

  public shared ({ caller }) func deleteEvent(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };

    if (not events.containsKey(id)) {
      Runtime.trap("Event not found");
    };

    events.remove(id);
  };

  // Public can view all events
  public query func getAllEvents() : async [Event] {
    events.values().toArray().sort();
  };

  // Public can view individual events
  public query func getEvent(id : Nat) : async ?Event {
    events.get(id);
  };

  // Booking Management

  // Public can create bookings without login
  public shared func createBooking(
    name : Text,
    email : Text,
    phone : Text,
    eventId : Nat,
  ) : async Nat {
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (_) {
        let booking : Booking = {
          id = nextBookingId;
          name;
          email;
          phone;
          eventId;
          status = #pending;
          timestamp = Time.now();
        };

        bookings.add(nextBookingId, booking);
        nextBookingId += 1;
        booking.id;
      };
    };
  };

  // Admin only - bookings contain sensitive customer data
  public query ({ caller }) func getBookingsByEvent(eventId : Nat) : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.values().toArray().filter(func(b) { b.eventId == eventId });
  };

  // Admin only
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };

    bookings.values().toArray().sort();
  };

  // Admin only
  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, newStatus : BookingStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };

    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          booking with status = newStatus;
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  // Admin only
  public shared ({ caller }) func deleteBooking(bookingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete bookings");
    };

    if (not bookings.containsKey(bookingId)) {
      Runtime.trap("Booking not found");
    };

    bookings.remove(bookingId);
  };
};
