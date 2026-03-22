import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
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

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    eventId : Nat;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  type OldActor = {
    events : Map.Map<Nat, Event>;
    bookings : Map.Map<Nat, Booking>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextEventId : Nat;
    nextBookingId : Nat;
  };

  type NewActor = {
    events : Map.Map<Nat, Event>;
    bookings : Map.Map<Nat, Booking>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextEventId : Nat;
    nextBookingId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      events = old.events;
      bookings = old.bookings;
      userProfiles = old.userProfiles;
      nextEventId = old.nextEventId;
      nextBookingId = old.nextBookingId;
    };
  };
};
