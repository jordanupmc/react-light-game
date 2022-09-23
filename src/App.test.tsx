import React from 'react';
import { findAllByTestId, findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ReactLightProps, ReactLight } from './ReactLight';
import { act } from 'react-dom/test-utils';

describe("React Light Game", () => {

  const props: ReactLightProps = { lightOnDelay: 100, lightOffWait: 20 };

  it('should render 4 traffic lights with WaitingDisplay', async () => {
    const { findAllByTestId, queryByTestId } = render(<App />);

    const trafficLight1 = await findAllByTestId("tf1-4");
    const trafficLight2 = await findAllByTestId("tf2-4");
    const trafficLight3 = await findAllByTestId("tf3-4");
    const trafficLight4 = await findAllByTestId("tf4-4");

    expect(trafficLight1).toHaveLength(1);
    expect(trafficLight2).toHaveLength(1);
    expect(trafficLight3).toHaveLength(1);
    expect(trafficLight4).toHaveLength(1);
    expect(queryByTestId("WaitingDisplay")).toBeVisible();
  });



  describe("Nominal sequence", () => {

    it('should light on 4 traffic light after click then should wait X seconds then light off finally click should display reaction time', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight1 = await findByTestId("tf1-4");
      const trafficLight2 = await findByTestId("tf2-4");
      const trafficLight3 = await findByTestId("tf3-4");
      const trafficLight4 = await findByTestId("tf4-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => expect(trafficLight1).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight2).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight3).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight4).toHaveClass('TrafficLight-light-on'));

      await waitFor(() => {
        expect(trafficLight1).toHaveClass('TrafficLight-light-off');
        expect(trafficLight2).toHaveClass('TrafficLight-light-off');
        expect(trafficLight3).toHaveClass('TrafficLight-light-off');
        expect(trafficLight4).toHaveClass('TrafficLight-light-off');
      }, { timeout: 3800 });

      fireEvent.click(appDiv);

      await waitFor(() => expect(queryByTestId("ReactionTimeDisplay")).toBeVisible());
    });


    it('should replay game when click after game over', async () => {
      // given
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight1 = await findByTestId("tf1-4");
      const trafficLight2 = await findByTestId("tf2-4");
      const trafficLight3 = await findByTestId("tf3-4");
      const trafficLight4 = await findByTestId("tf4-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => expect(trafficLight1).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight2).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight3).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight4).toHaveClass('TrafficLight-light-on'));

      await waitFor(() => {
        expect(trafficLight1).toHaveClass('TrafficLight-light-off');
        expect(trafficLight2).toHaveClass('TrafficLight-light-off');
        expect(trafficLight3).toHaveClass('TrafficLight-light-off');
        expect(trafficLight4).toHaveClass('TrafficLight-light-off');
      }, { timeout: 3800 });

      fireEvent.click(appDiv);

      await waitFor(() => expect(queryByTestId("ReactionTimeDisplay")).toBeVisible());


      // when 
      fireEvent.click(appDiv);
      await waitFor(() => expect(queryByTestId("ReactionTimeDisplay")).not.toBeInTheDocument());

      // then
      fireEvent.click(appDiv);

      await waitFor(() => expect(trafficLight1).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight2).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight3).toHaveClass('TrafficLight-light-on'));
      await waitFor(() => expect(trafficLight4).toHaveClass('TrafficLight-light-on'));

      await waitFor(() => {
        expect(trafficLight1).toHaveClass('TrafficLight-light-off');
        expect(trafficLight2).toHaveClass('TrafficLight-light-off');
        expect(trafficLight3).toHaveClass('TrafficLight-light-off');
        expect(trafficLight4).toHaveClass('TrafficLight-light-off');
      }, { timeout: 3800 });

      fireEvent.click(appDiv);

      await waitFor(() => expect(queryByTestId("ReactionTimeDisplay")).toBeVisible());

    });

  });

  describe("False start state", () => {
    it('should display False start when click after first light on', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight1 = await findByTestId("tf1-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight1).toHaveClass('TrafficLight-light-on'); });

      fireEvent.click(appDiv);
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();
    });

    it('should display False start when click after second light on', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight2 = await findByTestId("tf2-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight2).toHaveClass('TrafficLight-light-on'); }, { timeout: 2500 });

      fireEvent.click(appDiv);
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();
    });

    it('should display False start when click after third light on', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight3 = await findByTestId("tf3-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight3).toHaveClass('TrafficLight-light-on'); }, { timeout: 3500 });

      fireEvent.click(appDiv);
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();
    });

    it('should display False start when click after fourth light on', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight4 = await findByTestId("tf4-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight4).toHaveClass('TrafficLight-light-on'); }, { timeout: 4500 });

      fireEvent.click(appDiv);
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();
    });

    it('should replay game when click after false start', async () => {
      // given
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} />);

      const trafficLight1 = await findByTestId("tf1-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight1).toHaveClass('TrafficLight-light-on'); });

      fireEvent.click(appDiv);
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();

      // when 
      fireEvent.click(appDiv);

      // then
      expect(queryByTestId("FalseStartDisplay")).not.toBeInTheDocument();

      const trafficLight2 = await findByTestId("tf2-4");
      const trafficLight3 = await findByTestId("tf3-4");
      const trafficLight4 = await findByTestId("tf4-4");


      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight1).toHaveClass('TrafficLight-light-on'); });
      await waitFor(() => { expect(trafficLight2).toHaveClass('TrafficLight-light-on'); });
      await waitFor(() => { expect(trafficLight3).toHaveClass('TrafficLight-light-on'); });
      await waitFor(() => { expect(trafficLight4).toHaveClass('TrafficLight-light-on'); });

      await waitFor(() => {
        expect(trafficLight1).toHaveClass('TrafficLight-light-off');
        expect(trafficLight2).toHaveClass('TrafficLight-light-off');
        expect(trafficLight3).toHaveClass('TrafficLight-light-off');
        expect(trafficLight4).toHaveClass('TrafficLight-light-off');
      }, { timeout: 3800 });

      fireEvent.click(appDiv);

      await waitFor(() => expect(queryByTestId("ReactionTimeDisplay")).toBeVisible());

    });


    it('should not display start race after false start after fourth light on', async () => {
      const { findByTestId, queryByTestId } = render(<ReactLight {...props} lightOffWait={250} />);

      const trafficLight4 = await findByTestId("tf4-4");

      const appDiv = await findByTestId("ReactLightDiv");
      fireEvent.click(appDiv);

      await waitFor(() => { expect(trafficLight4).toHaveClass('TrafficLight-light-on'); }, { timeout: 2500 });

      setTimeout(() => fireEvent.click(appDiv), 100);
      await waitFor(() => expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument());

      await act(() => new Promise(r => setTimeout(r, 350)));
      expect(queryByTestId("FalseStartDisplay")).toBeInTheDocument();

    });


  });

});
