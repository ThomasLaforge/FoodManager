import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, YStack, H1, Spinner, Image, Button } from "tamagui";
import { apiGet } from "../../tools/fetch";

export default function Product() {
    const { productId } = useLocalSearchParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await apiGet(`/api/products/${productId}`);
                setProduct(data)
            }
            catch(err){
                console.error(err);
            }
        }

        getProduct();
    }
    , [productId]);

    if(!product){
        return (
            <YStack justifyContent="center" flex={1}>
                <Spinner size="large" color="$color" />
            </YStack>
        )
    }

    return (
        <YStack alignItems="center" justifyContent="space-between">
            <H1 p={"$6"}>{product.name}</H1>
            <Image 
                resizeMode="contain" 
                source={{ uri: product.image, width:250, height:250 }}  
            />
            <Text alignSelf="flex-start" p={"$4"} fontSize={"$5"}>{product.description}</Text>
            <Button variant="outlined">Ajouter</Button>
        </YStack>
    );
}