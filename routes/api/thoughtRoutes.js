const router = require("express").Router();
const{user,thought} = reuire("../../models");

router.get("/", async (req, res) => {
  try{
    const dbThoughtData = await thought.find().sort()({
      createdAt: -1,
    });
    res.json(dbThoughtData);
  } catch (err){
    res.status(404).json(err);
  }
})

router.post('/', async (req, res) => {
  try{
    const dbThoughtData = await thought.create(req.body);
    const dbUserData = await user.findOneAndUpdate(
      {
        _id: req.body.userId
      },
      {$push: {thoughts:dbThoughtData._id}},
      {new: true}
    );
    if (!dbUserData){
      return res.status(404).json({
        message: "Thought created but no user for this ID",
      });
    }
    res.status(200).json({message:"Thought successfully created"});
  }  catch (err) {
    res.status(404).json(err);
  }
});

router.get("/thoughtId", async (req, res) => {
  try{
    const dbThoughtData = await thought.findOne({_id: req.params.thoughtId});
    if (!dbThoughtData) {
      return res.status(404).json({message:"no thought with this ID"});
    }
    res.json(dbThoughtData);
  } catch (err){
    res.status(500).json(err);
  }
})
router.put("/:thoughtId", async (req, res) => {
  try{
    const dbThoughtData = thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true},
    );
    if (!dbThoughtData) {
      return res.status(404).json({message:"No thought with this ID"});
    }
    res.json(dbThoughtData);
  } catch(err){
    res.json(err);
  }
})