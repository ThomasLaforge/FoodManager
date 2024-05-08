import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductMiniature from '../components/ProductMiniature/ProductMiniature';
import { apiGet } from '../tools/fetch';

export default function Index() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await apiGet('/api/products');
                console.log(data)
                setProducts(data);
            }
            catch(err){
                console.error(err);
            }
        }

        getProducts();
    }, []);

    return (
        <View>
            <Text>Frizzer !</Text>
            <View style={styles.lastScannedProducts}>
                <Text>Liste des produits</Text>
                {products.map((product) => (
                    <ProductMiniature key={product.id} product={product} /> 
                ))}
                <Text>{JSON.stringify(products)}</Text>
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