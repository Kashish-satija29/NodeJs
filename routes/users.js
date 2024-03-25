
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth= require('../middleware/auth');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

 
  const user = new User({ name, email, password });
  await user.save();

  
  res.json(user);
});
module.exports = router;


router.get('/user', auth, async (req, res) => {
    try {
      const userId = req.user.id;
 
      const user = await User.findById(userId);
 
      const userName = user.name;

 
      res.json({ name: userName });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.delete('/user/:id', auth, async (req, res) => {
    try {
      
        const user = await User.findOne({ _id: req.params.id, _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await User.deleteOne({ _id: req.params.id });

        res.status(204).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
