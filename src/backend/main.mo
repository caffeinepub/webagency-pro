import Array "mo:core/Array";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Type Definitions
  type Category = {
    #web_design;
    #web_development;
    #ecommerce;
    #seo;
  };

  type PortfolioItem = {
    id : Nat;
    title : Text;
    description : Text;
    category : Category;
    imageUrl : Text;
    projectUrl : Text;
    clientName : Text;
    completionYear : Nat;
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
    features : [Text];
    iconName : Text;
    displayOrder : Nat;
  };

  type ContactFormSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type SiteSettings = {
    companyName : Text;
    tagline : Text;
    phone : Text;
    email : Text;
    address : Text;
    whatsappNumber : Text;
    facebookUrl : Text;
    instagramUrl : Text;
    linkedinUrl : Text;
    twitterUrl : Text;
  };

  module PortfolioItem {
    public func compare(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      Nat.compare(a.id, b.id);
    };

    public func compareByDisplayOrder(a : Service, b : Service) : Order.Order {
      Nat.compare(a.displayOrder, b.displayOrder);
    };
  };

  module ContactFormSubmission {
    public func compare(a : ContactFormSubmission, b : ContactFormSubmission) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // State Variables
  var nextPortfolioId = 1;
  var nextServiceId = 1;
  var nextContactFormId = 1;

  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  let services = Map.empty<Nat, Service>();
  let contactForms = List.empty<ContactFormSubmission>();
  var siteSettings : ?SiteSettings = null;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Public Methods

  // Portfolio Management
  public shared ({ caller }) func createPortfolioItem(title : Text, description : Text, category : Category, imageUrl : Text, projectUrl : Text, clientName : Text, completionYear : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create portfolio items");
    };

    let item : PortfolioItem = {
      id = nextPortfolioId;
      title;
      description;
      category;
      imageUrl;
      projectUrl;
      clientName;
      completionYear;
    };

    portfolioItems.add(nextPortfolioId, item);
    nextPortfolioId += 1;
  };

  public shared ({ caller }) func updatePortfolioItem(id : Nat, title : Text, description : Text, category : Category, imageUrl : Text, projectUrl : Text, clientName : Text, completionYear : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };

    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };

    let updatedItem : PortfolioItem = {
      id;
      title;
      description;
      category;
      imageUrl;
      projectUrl;
      clientName;
      completionYear;
    };

    portfolioItems.add(id, updatedItem);
  };

  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };

    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };

    portfolioItems.remove(id);
  };

  public query ({ caller }) func getPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort();
  };

  // Service Management
  public shared ({ caller }) func createService(title : Text, description : Text, features : [Text], iconName : Text, displayOrder : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create services");
    };

    let service : Service = {
      id = nextServiceId;
      title;
      description;
      features;
      iconName;
      displayOrder;
    };

    services.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public shared ({ caller }) func updateService(id : Nat, title : Text, description : Text, features : [Text], iconName : Text, displayOrder : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };

    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };

    let updatedService : Service = {
      id;
      title;
      description;
      features;
      iconName;
      displayOrder;
    };

    services.add(id, updatedService);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };

    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };

    services.remove(id);
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray().sort(Service.compareByDisplayOrder);
  };

  // Contact Form Management
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, subject : Text, message : Text) : async () {
    let submission : ContactFormSubmission = {
      id = nextContactFormId;
      name;
      email;
      phone;
      subject;
      message;
      timestamp = Time.now();
    };

    contactForms.add(submission);
    nextContactFormId += 1;
  };

  public query ({ caller }) func getContactFormSubmissions() : async [ContactFormSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact form submissions");
    };

    contactForms.toArray().sort();
  };

  // Site Settings Management
  public shared ({ caller }) func updateSiteSettings(companyName : Text, tagline : Text, phone : Text, email : Text, address : Text, whatsappNumber : Text, facebookUrl : Text, instagramUrl : Text, linkedinUrl : Text, twitterUrl : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };

    let settings : SiteSettings = {
      companyName;
      tagline;
      phone;
      email;
      address;
      whatsappNumber;
      facebookUrl;
      instagramUrl;
      linkedinUrl;
      twitterUrl;
    };

    siteSettings := ?settings;
  };

  public query ({ caller }) func getSiteSettings() : async ?SiteSettings {
    siteSettings;
  };
};
