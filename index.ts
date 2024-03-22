/// <reference lib="es2015" />
class Contact {
    name: string;
    email: string;
    phone: string;
    group?: string; 
  
    constructor(name: string, email: string, phone: string, group?: string) {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.group = group; 
    }
  }
  
  class AddressBook {
    contacts: Contact[] = [];
  
    addContact(contact: Contact): void {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact.email)) {
        throw new Error("Invalid email format");
      }
  
      
      if (!contact.name || contact.name.trim() === "") {
        throw new Error("Name cannot be empty");
      }
  
      
  
      this.contacts.push(contact);
    }
  
    findContactByName(name: string): Contact | undefined {
      return this.contacts.find((contact) => contact.name === name);
    
    }
  
    filterByGroup(group: string): Contact[] {
      return this.contacts.filter((contact) => contact.group === group);
    }
  
    sortByName(): void {
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  
  
    searchContacts(searchTerm: string): Contact[] {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }
  
    printContacts(): void {
      for (const contact of this.contacts) {
        console.log(`Name: ${contact.name}`);
        console.log(`Email: ${contact.email}`);
        console.log(`Phone: ${contact.phone}`);
        if (contact.group) {
          console.log(`Group: ${contact.group}`);
        }
        console.log("-----");
      }
    }
  }
  
  const addressBook = new AddressBook();
  
  const contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890", "Friends");
  const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123"); // Invalid email
  const contact3 = new Contact("", "valid@email.com", "789-012-3456", "Family"); // Empty name
  
  addressBook.addContact(contact1);
  
  try {
    addressBook.addContact(contact2); 
    addressBook.addContact(contact3); 
  } catch (error: unknown) {
    
    if (typeof error === "string") {
      
      console.error("Error adding contact:", error);
    } else if (error instanceof Error) {
    
      console.error("Error adding contact:", error.message);
    } else {
    
      console.error("Unknown error adding contact:", error);
    }
  }
  
  console.log("Contacts:");
  addressBook.printContacts();
  
  // Example 
  const searchResults = addressBook.searchContacts("john");
  console.log("Search results (name containing 'john'):");
  searchResults.forEach((contact) => console.log(`  - ${contact.name}`));
  
  
  
  