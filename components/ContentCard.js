import * as React from 'react';
import { StyleSheet, Platform } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';


const ContentCard = () => {

  let style = styles.contentCardWeb;
  if (Platform.OS === 'ios' || Platform.OS === "android") {
    style = styles.contentCard;
  }

  return (
    <Card style={style}>
      <Card.Content style={styles.text}>
        <Title style={styles.text}>Card title</Title>
        <Paragraph styles={styles.text}>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button style={styles.button}>Sound</Button>
      </Card.Actions>
    </Card>
  );

}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCard: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  contentCardWeb: {
    marginVertical: 10,
    marginHorizontal: "30%",
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
})


export default ContentCard;