
package com.myapplication;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import android.net.Uri;
import android.media.RingtoneManager;
import android.media.Ringtone;

public class RingtoneTitleModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    RingtoneTitleModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "RingtoneTitleModule";
    }

    @ReactMethod
    public void getRingtoneTitle(final Callback errorCallback, final Callback successCallback) {
        try {
            Uri defaultRingtoneUri = RingtoneManager.getActualDefaultRingtoneUri(reactContext.getApplicationContext(),
                    RingtoneManager.TYPE_RINGTONE);
            Ringtone defaultRingtone = RingtoneManager.getRingtone(reactContext, defaultRingtoneUri);
            // defaultRingtone.play();

            String ringtoneName = defaultRingtone.getTitle(reactContext);

            successCallback.invoke(ringtoneName);
        } catch (final Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}