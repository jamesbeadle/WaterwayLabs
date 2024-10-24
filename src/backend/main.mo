import Debug "mo:base/Debug";

actor {
    public func submitForm(data : { name : Text; email : Text; message : Text }) : async Text {
        Debug.print("Received form submission:");
        Debug.print("Name: " # data.name);
        Debug.print("Email: " # data.email);
        Debug.print("Message: " # data.message);
        return "Form submitted successfully";
    }
}
