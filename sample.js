db.elections.aggregate([
    {$match: {
        "state": "Andaman & Nicobar Islands"
    }}
])

db.elections.aggregate([
    {$group: {
        _id: "$party",
        maxVote: {$max: "$votes"}
    }},
    {
        $project: {
            partyName: "$_id",
            _id: 0,
            vote: "$maxVote"
        }
    },
    {
        $sort: {maxVote: -1}
    }
])

db.atheletes.aggregate([
    {$group: {
        _id: "$sports"
    }}
])

db.atheletes.aggregate([
    {$unwind: "$sports"},
    {
        $group: {
            _id: "$sports",
            count: {$sum: 1}
        }
    },
    {$out: "sports_list"}
])