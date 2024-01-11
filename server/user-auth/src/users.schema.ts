import * as mongoose from 'mongoose';
let counter = 0;

export const UserSchema = new mongoose.Schema(
  {
    user_name: String,
    date_of_birth: String,
    phone_number: String,
    gender: String,
    bank_account_number: String,
    id_card_number: String,
    place_of_issue: String,
    role: String,
    email_address: String,
    password: String,
    profile_image: String,
    emp_ID: {
      type: String,
      default: function () {
        // Increment the counter for each new ID
        counter += 1;

        const currentYear = new Date().getFullYear();

        // Pad the counter with leading zeros to ensure two-digit formatting
        const paddedCounter = counter.toString().padStart(2, '0');

        // Generate the empID with the desired format
        return `${currentYear}EMS${paddedCounter}`;
      },
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    user_type: {
      type: Number,
      default: 3, // 1 = Admin, 2 = Sub-admin , 3 = User
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('User', UserSchema);
