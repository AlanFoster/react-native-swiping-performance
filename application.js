import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const Page = ({ index }) => (
  <ScrollView>
    {console.log('Render: ', index)}
    {Array(50).fill().map((_value, row) => (
      <Text key={row}>
        Page {index} - row {row}
      </Text>
    ))}
  </ScrollView>
);

const PageRenderer = ({key, index}) => (
  <Page
    key={key}
    index={index}
  />
);

const PureApplication = ({ index, onPrevious, onNext, onChangeIndex }) => (
  <View style={{ marginTop: 25, flex: 1 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={onPrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>

    <VirtualizeSwipeableViews
      style={{ borderWidth: 1, borderColor: 'red' }}
      index={index}
      slideRenderer={PageRenderer}
      onChangeIndex={onChangeIndex}
      animateTransitions={true}
    />
  </View>
);

class ConnectedApplication extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onChangeIndex = this.onChangeIndex.bind(this);

    this.state = {
      index: 0
    }
  }

  onPrevious() {
    this.setState({
      index: this.state.index - 1
    });
  }

  onNext() {
    this.setState({
      index: this.state.index + 1
    });
  }

  onChangeIndex(index) {
    this.setState({
      index
    })
  }

  render() {
    return (
      <PureApplication
        index={this.state.index}
        onPrevious={this.onPrevious}
        onNext={this.onNext}
        onChangeIndex={this.onChangeIndex}
      />
    );
  }
}

export default ConnectedApplication;