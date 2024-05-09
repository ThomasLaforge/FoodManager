import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Card, Image, Text, YStack } from "tamagui";

export default function ProductMiniature({ product }) {
    const { image, name, bar_code } = product

    return (
        <Card 
            style={styles.miniature} 
            animation="bouncy"
            elevate size="$4" bordered
            onPress={() => router.navigate("/product/" + product.id.toString() )}
        >
            <Card.Header>
                <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={{ uri: image, width: 100, height: 100 }} 
                />
            </Card.Header>
            <Card.Footer>
                <YStack>
                    <Text>{name}</Text>
                    <Text>{bar_code}</Text>
                </YStack>
            </Card.Footer>
            <Card.Background />
        </Card>
    );
}

const styles = StyleSheet.create({
    miniature: {
        display: "flex",
        flexDirection: "column",
        width: 130,
        aspectRatio: 0.95
    },
    image: {
        flex: 1
    }
});