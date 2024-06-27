import Shop from '../models/shop.schema.js'


// Create a new shop
export const createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all shops
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single shop by ID
export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.status(200).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a shop by ID
export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.status(200).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a shop by ID
export const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.status(200).json({ message: 'Shop deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
