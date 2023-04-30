import React, { Component } from "react";
import { Button, Image, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import SText from "../../../src/components/SText";
import ScannerForground from "../assets/images/ScannerForground";

class PairingCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.onNewQrcode = props.onNewQrcode;
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

  onBarCodeRead(scanResult) {
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.props.onNewQrcode(scanResult.data);
        this.barcodeCodes.push(scanResult.data);
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgreen",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={styles.overlay}>
          <ScannerForground />

          <View>
            <SText textType="body" style={styles.scanScreenMessage}>
              Please hold the camera in front of your other device QR code.
            </SText>
            <SText textType="body" style={styles.scanScreenMessage}>
              Pairing process will begin automatically.
            </SText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  scanScreenMessage: {
    fontSize: 14,
    margin: 16,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default PairingCodeScanner;
