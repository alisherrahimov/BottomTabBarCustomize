import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useEffect} from 'react';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#59FFBD',
      }}>
      <Text>Home</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7FF5E9',
      }}>
      <Text>Settings!</Text>
    </View>
  );
}
function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#70B2FB',
      }}>
      <Text>SearchScreen!</Text>
    </View>
  );
}
function UserScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9888FB',
      }}>
      <Text>UserScreen!</Text>
    </View>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  const move = new Animated.Value(0);
  const Inter = new Animated.Value(0);

  const [endvalue, setEndValue] = useState(2);
  useEffect(() => {
    Animated.spring(move, {
      toValue: endvalue,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [move]);
  console.log(move);
  console.log(endvalue);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 50,
        backgroundColor: '#fff',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
            key={index}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Animated.View
                style={[
                  styles.Animated,
                  {backgroundColor: isFocused ? '#673ab7' : '#fff'},
                  {
                    transform: [
                      {
                        translateX: isFocused
                          ? move.interpolate({
                              inputRange: [0, 80],
                              outputRange: [0, -50],
                            })
                          : move,
                      },
                    ],
                  },
                ]}
              />
              <Icon
                name={`${label}`}
                solid={true}
                size={25}
                style={{
                  color: isFocused ? '#673ab7' : '#DBDBDB',
                  marginTop: 15,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="search" component={HomeScreen} />
        <Tab.Screen name="tachometer-alt" component={SettingsScreen} />
        <Tab.Screen name="list-alt" component={UserScreen} />
        <Tab.Screen name="user" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  Animated: {
    height: 4,
    width: 60,
    borderRadius: 50,
  },
});
