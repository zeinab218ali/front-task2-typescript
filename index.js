/// <reference lib="es2015" />
var Contact = /** @class */ (function () {
    function Contact(name, email, phone, group) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group; // Allow optional group assignment in constructor
    }
    return Contact;
}());
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            throw new Error("Invalid email format");
        }
        // Name validation (example - check for empty name)
        if (!contact.name || contact.name.trim() === "") {
            throw new Error("Name cannot be empty");
        }
        // You can add further validations for phone number format, etc.
        this.contacts.push(contact);
    };
    AddressBook.prototype.findContactByName = function (name) {
        return this.contacts.find(function (contact) { return contact.name === name; });
    };
    AddressBook.prototype.filterByGroup = function (group) {
        return this.contacts.filter(function (contact) { return contact.group === group; });
    };
    AddressBook.prototype.sortByName = function () {
        this.contacts.sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    // New functionalities:
    // 1. Validate various contact properties on addition (already implemented)
    // 2. Search contacts by name (partial match)
    AddressBook.prototype.searchContacts = function (searchTerm) {
        var normalizedSearchTerm = searchTerm.toLowerCase();
        return this.contacts.filter(function (contact) {
            return contact.name.toLowerCase().includes(normalizedSearchTerm);
        });
    };
    AddressBook.prototype.printContacts = function () {
        for (var _i = 0, _a = this.contacts; _i < _a.length; _i++) {
            var contact = _a[_i];
            console.log("Name: ".concat(contact.name));
            console.log("Email: ".concat(contact.email));
            console.log("Phone: ".concat(contact.phone));
            if (contact.group) {
                console.log("Group: ".concat(contact.group));
            }
            console.log("-----");
        }
    };
    return AddressBook;
}());
var addressBook = new AddressBook();
var contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890", "Friends");
var contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123"); // Invalid email
var contact3 = new Contact("", "valid@email.com", "789-012-3456", "Family"); // Empty name
addressBook.addContact(contact1);
try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
    addressBook.addContact(contact3); // This will throw an error (empty name)
}
catch (error) {
    // Handle different error types using type guards
    if (typeof error === "string") {
        // Handle string errors (e.g., custom error messages)
        console.error("Error adding contact:", error);
    }
    else if (error instanceof Error) {
        // Handle standard Error objects
        console.error("Error adding contact:", error.message);
    }
    else {
        // Handle other unknown error types (log or re-throw)
        console.error("Unknown error adding contact:", error);
    }
}
console.log("Contacts:");
addressBook.printContacts();
// Example usage of new search functionality
var searchResults = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach(function (contact) { return console.log("  - ".concat(contact.name)); });
