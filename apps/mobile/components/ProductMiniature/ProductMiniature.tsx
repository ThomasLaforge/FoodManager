import { Image, StyleSheet, Text, View } from "react-native";

export default function ProductMiniature({ product }) {
    const { image, name, bar_code } = product

    return (
        <View style={styles.miniature}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{bar_code}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    miniature: {
        display: "flex",
        flexDirection: "column",
        width: 130,
        aspectRatio: 0.95,
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 10,
    },
    image: {
        flex: 1
    },
    text: {
        color: "black",
        backgroundColor: "red",
        height: 20
    }
});