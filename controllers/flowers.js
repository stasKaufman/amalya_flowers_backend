const { Op } = require('sequelize');
const Flower = require('../models/flowers');
const FlowerTracker = require('../models/flowerTracker');
const { to } = require('await-to-js');

async function getFlowerById (req, res, next) {
    const flowerId = req.params.id;
    let flower, error

    [error, flower] = await to(Flower.findOne({
            where: {id: flowerId},
            include: [{ model: FlowerTracker }]
        }
    ))

    if (error) {
        return next(error)
    }

    if (!flower) {
        const error = new Error('Flower does not exist')
        error.statusCode = 404;
        return next(error);
    }

    res.json({flower})
}

async function searchFlowers (req, res, next) {
    const { text, limit, offset } = req.body
    let totalCountFilters = {} , 
    flowersFilters = { offset: Number(offset), limit: Number(limit) }

    // if search string not empty we set filters
    if (text) {
        const querySearchFilters = [
            { id: { [Op.like]: '%' + text + '%' } },
            { name: { [Op.like]: '%' + text + '%' } },
            { variety_catalog_id: {[Op.like]: '%' + text + '%' } },
            { breeder: { [Op.like]: '%' + text + '%' } },
            { shape: { [Op.like]: '%' + text + '%' } },
            { color: { [Op.like]: '%' + text + '%' } }
          ]

        const where = {
                [Op.or]: querySearchFilters
        }
        
        totalCountFilters.where = where;
        flowersFilters.where = where;

    }

    let totalCountQuery = Flower.count(totalCountFilters)
    let flowersQuery = Flower.findAll(flowersFilters)

    try {
        const flowers = await Promise.all([flowersQuery, totalCountQuery])
        res.json({flowers: flowers[0], total: flowers[1]})
    } catch(error) {
        return next(error)
    }
}

async function createUpdateFlowerTracker( req, res, next) {
    const flowerTrackerData = req.body;
    let trackerItem, created

    try {
        [trackerItem, created] = await FlowerTracker.upsert(flowerTrackerData);
    } catch (error) {
        return next(error)
    }

    res.status(201).json({trackerItem, created})
}

module.exports = {
    getFlowerById,
    searchFlowers,
    createUpdateFlowerTracker
}