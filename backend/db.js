const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Vaishali:Vaishali%402003@cluster0.iolxuci.mongodb.net/labequip?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
   
    const categoryData = await mongoose.connection.db.collection("categoryData").find({}).toArray();
    const category = await mongoose.connection.db.collection("category").find({}).toArray();

    global.categoryData = categoryData;
    global.category = category;
    
    // console.log('Data fetched:', global.categoryData);
    // console.log('Categories fetched:', global.category);
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
