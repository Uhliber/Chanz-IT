const parseFilterUrl = (url) => {
    const parts = url.split("|");
    //USING MAP
    const filters = parts.map(data => {
        const split = data.split(":");
        const obj = {};
        obj[split[0]] = split[1].split(",");
        return obj;
    });
    return filters;
};
const filters = parseFilterUrl(
    "regions:the-north|people:hodor,the-hound|omg:true"
);
console.log({ filters });