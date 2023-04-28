const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',  async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll();
    res.status(201).json(tagData);
    const productData = await Product.findAll();
    res.status(201).json(productData);
    const productTagData = await ProductTag.findAll();
    res.status(201).json(productTagData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll();
    const productData = await Product.findAll();
    const productTagData = await ProductTag.findAll();
    let storage;
    if(!tagData) {
      res.status(404).json({ message: 'There are no products that exsist with this id.'});
      return;
    }
    res.status(200).json(tagData)
    for( let i = 0;  i< productTagData.length; i++)
    {
      if(tagData.id == productTagData[i].tag_id)
      {
        storage = productTagData[i];
        res.status(200).json(productTagData[i]);
      }
    }
    for( let i = 0;  i< productData.length; i++)
    {
      if(storage.tag_id == productData[i].id)
      {
        res.status(200).json(productData[i]);
      }
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/',  async (req, res) => {
  // create a new tag
  try{
    const tagData = await Category.create(req.body);
    res.status(200).json(tagData)
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id',  async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Category.update (req.body, {
      where:{
       id: req.params.id, 
      },
    });
    if(!tagData[0]) {
      res.status(404).json({ message: 'This tag update lacks an id.'});
      return;
    }
    res.status(200).json(tagData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',  async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy (req.body, {
      where:{
        id: req.params.id,
      },
    });
    if(!tagData[0]) {
      res.status(404).json({ message: 'This product destruction lacks an id.'});
      return;
    }
    res.status(200).json(tagData);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
