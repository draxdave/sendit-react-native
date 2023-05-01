package app.siamak.sendit;

import android.content.BroadcastReceiver;
        import android.content.Context;
        import android.content.Intent;

public class SenditBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        MyModule.onEventReceived(context, intent);
    }
}