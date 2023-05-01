package app.siamak.sendit;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import android.os.Handler;
import android.util.Log;
import android.widget.Toast;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import expo.modules.ReactActivityDelegateWrapper;
import java.util.Objects;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
//    handleNewIntent(getIntent(), 1000);
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
handleNewIntent(getIntent(), 5000);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        ));
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }

  @Override
  public void onNewIntent(Intent intent) {
    Log.e("handleNewIntent", "New Intent " + intent.getAction());
    handleNewIntent(intent, 0);
    super.onNewIntent(intent);
  }

  private void handleNewIntent(Intent intent, int withDelay) {
    try {
      Toast.makeText(this, "handleNewIntent", Toast.LENGTH_SHORT).show();
      if (
              Objects.equals(intent.getAction(), Intent.ACTION_SEND) &&
                      intent.getType().startsWith("text/")
      ) {
        String text = intent.getStringExtra(Intent.EXTRA_TEXT);

        Intent i = new Intent();
        i.setAction("senditAction");
        i.putExtra("event", "newSharedText");
        i.putExtra("text", text);

        if (withDelay == 0){
          sendBroadcast(i);
        }else {
          new Handler().postDelayed(() -> {
            if (!isFinishing() && !isDestroyed()) {
              Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
              MyModule.onEventReceived(this, i);
//              sendBroadcast(i);
            }
          }, withDelay);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
