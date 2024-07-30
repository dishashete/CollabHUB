const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactFormSchema = new Schema({
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  positionInCompany: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  availabilityStartDate: { type: Date, required: true }
  // availabilityEndDate has been removed
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;