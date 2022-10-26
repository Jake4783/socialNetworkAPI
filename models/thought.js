const {Schema, model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      require: `you need to leave a thought!`,
      minlength: 1,
      maxlength: 280,
    },
    username:{
      type: String,
      required: true,
    },
    createAt:{
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters:true,
    },
    id:false
  }
)

thoughtSchema.virtual("reactionCount").get(function(){
  return this.reaction.length;
})

const thought = model("thought", thoughtSchema);

module.exports = thought;