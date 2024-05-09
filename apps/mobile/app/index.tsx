import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductMiniature from '../components/ProductMiniature/ProductMiniature';
import { apiGet } from '../tools/fetch';
import { H1, XStack, Spinner, H2 } from 'tamagui';

export default function Index() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await apiGet('/api/products');
                console.log(data)
                setLoadingProducts(false);
                setProducts(data);
            }
            catch(err){
                console.error(err);
                setLoadingProducts(false);
            }
        }

        getProducts();
    }, []);

    return (
        <View>
            <H1 textAlign='center' m='$5'>Frizzer !</H1>
            <View style={styles.lastScannedProducts}>
                <H2 m={"$3"}>Liste des produits</H2>
                <XStack w={"100%"} px={"$3"}>
                    {loadingProducts 
                        ? <Spinner size="small" color="$green10" /> 
                        : products.map((product) => (
                            <ProductMiniature key={product.id} product={product} /> 
                        ))
                    }
                </XStack>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    lastScannedProducts: {
        display: "flex",
        flexDirection: "column",
    },
});