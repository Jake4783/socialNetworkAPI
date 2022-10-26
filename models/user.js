const {Schema, model} = require("mongoose");

const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      require: true,
      unique: true,
      match: ["must match an email address"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      getters:true,
    },
    id:false
  }
)

userSchema.virtual("friendCount").get(function(){
  return this.friend.length;
})

const user = model("user", userSchema);

module.exports = user;