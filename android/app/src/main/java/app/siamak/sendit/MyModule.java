package app.siamak.sendit;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public MyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        MyModule.reactContext = reactContext;

    }

    public static void onEventReceived(Context context, Intent intent) {
        WritableMap params;
        Bundle extras = intent.getExtras();
        if (extras != null) {
            try {
                params = Arguments.fromBundle(extras);
            } catch (Exception e) {
                params = Arguments.createMap();
            }
        } else {
            params = Arguments.createMap();
        }

        ReactContext reactContext = ((CustomReactNativeApplication) context.getApplicationContext())
                .getReactContext();

        if (reactContext != null) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("broadcaster-data-received", params);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "MyBridge";
    }
}
