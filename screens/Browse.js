import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Block, Text, Card, Badge } from '../components';
import { theme, mocks } from '../constants';

const Browse = props => {
  const { profile, navigation } = props;

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('Products');
  const tabs = ['Products', 'Inspirations', 'Shop'];

  useEffect(() => {
    setCategories(props.categories);
  }, []);

  const handleTab = tab => {
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );
    setActive(tab);
    setCategories(filtered);
  };

  const renderTab = tab => {
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Browse
        </Text>
        <Button onPress={() => navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <Block flex={false} row style={styles.tabs}>
        {tabs.map(tab => renderTab(tab))}
      </Block>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} row space="between" style={styles.categories}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.name}
              onPress={() => navigation.navigate('Explore', { category })}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0,20)"
                >
                  <Image source={category.image} />
                </Badge>
                <Text>{category.name}</Text>
                <Text gray caption>
                  {category.count} products
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: theme.sizes.base * 2,
    marginVertical: theme.sizes.base
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 1.5,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    width: 150,
    height: 150
  }
});
