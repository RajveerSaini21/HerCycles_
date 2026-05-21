
const Cycle = require("../models/Cycle");

// GET /api/cycles
exports.getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id }).sort({ start_date: -1 });
    res.json(cycles);
  } catch (error) {
    console.error("Error fetching cycles:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/cycles
exports.createCycle = async (req, res) => {
  try {
    const { start_date, end_date, period_length, cycle_length, flow_intensity } = req.body;

    const cycle = new Cycle({
      user: req.user._id, // ✅ link to logged-in user
      start_date,
      end_date,
      period_length,
      cycle_length,
      flow_intensity,
    });

    const savedCycle = await cycle.save();
    res.status(201).json(savedCycle);
  } catch (error) {
    console.error("Error creating cycle:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/cycles/:id
exports.updateCycle = async (req, res) => {
  try {
    const cycle = await Cycle.findOne({ _id: req.params.id, user: req.user._id });
    if (!cycle) return res.status(404).json({ message: "Cycle not found" });

    Object.assign(cycle, req.body);
    const updatedCycle = await cycle.save();

    res.json(updatedCycle);
  } catch (error) {
    console.error("Error updating cycle:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cycles/:id
exports.deleteCycle = async (req, res) => {
  try {
    const cycle = await Cycle.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!cycle) return res.status(404).json({ message: "Cycle not found" });

    res.json({ message: "Cycle deleted" });
  } catch (error) {
    console.error("Error deleting cycle:", error);
    res.status(500).json({ message: "Server error" });
  }
};
