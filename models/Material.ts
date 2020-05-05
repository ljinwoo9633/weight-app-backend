class Material
{
    private name: String = '';
    private weight: Number = 0;
    private price: Number = 0;
    private imageUrl: String = '';

    constructor(name: String, weight: Number, price: Number, imageUrl: String)
    {
        this.name = name;
        this.weight = weight;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    GetName = () => {
        return this.name;
    }

    GetPrice = () => {
        return this.weight;
    }

    GetWeight = () => {
        return this.price;
    }

    GetImageUrl = () => {
        return this.imageUrl;
    }
}

export default Material;