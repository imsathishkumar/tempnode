const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  middlename: String,
  address: String,
  email: String,
  phone: Number,
  height: Number,
  weigth: Number,
});

const Form = mongoose.model("form", formSchema);

async function createForm(req) {
  const form = new Form({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    middlename: req.body.middlename,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    height: req.body.height,
    weigth: req.body.weigth,
  });
  await form.save();
  return form;
}
async function deleteItem(req){
    const result =  await Form.findByIdAndRemove(req.params.id);
    return result;
}
exports.Form = Form;
exports.createForm = createForm;
exports.deleteItem = deleteItem;
