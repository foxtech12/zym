const Contact = require("../modal/ContactModal");

exports.contactPost = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact request submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contact entries
exports.contactGet = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
