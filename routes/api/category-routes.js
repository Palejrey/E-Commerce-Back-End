const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll();
    res.status(201).json(categoryData);
    const productData = await Product.findAll();
    res.status(201).json(productData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async  (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findbyPk(req.params.id);
    const productData = await Product.findAll();
    if(!categoryData) {
      res.status(404).json({ message: 'There are no categories that exsist with this id.'});
      return;
    }
    res.status(200).json(categoryData)
    for( let i = 0;  i< productData.length; i++)
    {
      if(categoryData.id == productData[i].category_id)
      {
        res.status(200).json(productData[i]);
      }
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async  (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update (req.body, {
      where:{
       id: req.params.id, 
      },
    });
    if(!categoryData[0]) {
      res.status(404).json({ message: 'This category update lacks an id.'});
      return;
    }
    res.status(200).json(categoryData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async  (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy (req.body, {
      where:{
       id: req.params.id, 
      },
    });
    if(!categoryData[0]) {
      res.status(404).json({ message: 'This category destruction lacks an id.'});
      return;
    }
    res.status(200).json(categoryData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
