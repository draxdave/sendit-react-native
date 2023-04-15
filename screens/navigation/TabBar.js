import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabContainer}
              >
                <Text style={[styles.tabItem, { color: isFocused ? '#673ab7' : '#222' }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
}

export default TabBar;

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    tabItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    }
});