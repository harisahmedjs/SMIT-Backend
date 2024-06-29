import express from 'express'
import Users from '../models/User.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'
const router = express.Router()


router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send({ data: users })
})
router.post('/register', async (req, res) => {
    try {
        await Users.create(req.body)

        res.send({ message: 'User registered successfully!'})
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/login', async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      // Step 1: Check if email exists
      const user = await Users.findOne({ Email });
  
      if (!user) {
        return res.status(404).send({ message: 'Email not found!' });
      }
  
      // Step 2: Compare Password
      const isCorrectPassword = await user.comparePassword(Password);
  
      if (!isCorrectPassword) {
        return res.status(404).send({ message: 'Password is incorrect!' });
      }
  
      // Step 3: Generate Token
      const token = user.generateToken();
      user.tokens.push(token);
      await user.save();
  
      res.send({ message: 'User logged in successfully!', token });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  });

router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})

export default router