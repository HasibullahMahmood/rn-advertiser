package com.myapplication;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.media.AudioManager;
import com.facebook.react.bridge.Callback;
import android.content.Context;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import javax.annotation.Nullable;

public class RingModeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private BroadcastReceiver receiver;

    RingModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RingModeModule";
    }

    private void registerReceiverHandler() {
        final ReactApplicationContext reactContext = getReactApplicationContext();

        if (receiver != null) {
            return;
        }

        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {

                WritableMap params = Arguments.createMap();
                String mode = getMode();
                params.putString("mode", mode);

                sendEvent(reactContext, "onModeChange", params);
            }
        };

        IntentFilter filter = new IntentFilter(AudioManager.RINGER_MODE_CHANGED_ACTION);
        reactContext.registerReceiver(receiver, filter);
    }

    private void sendEvent(ReactApplicationContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    private String getMode() {
        final ReactApplicationContext reactContext = getReactApplicationContext();
        AudioManager myAudioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
        final int modeInt = myAudioManager.getRingerMode();
        String modeStr = "";
        switch (modeInt) {
            case 0:
                modeStr = "SILENT";
                break;
            case 1:
                modeStr = "VIBRATE";
                break;
            case 2:
                modeStr = "NORMAL";
                break;
            default:
                break;
        }
        return modeStr;
    }

    private void unregisterReceiverHandler() {
        if (receiver == null) {
            return;
        }
        getReactApplicationContext().unregisterReceiver(receiver);
        receiver = null;
    }

    @ReactMethod
    public void getRingMode(final Callback errorCallback, final Callback successCallback) {
        try {
            String mode = getMode();

            successCallback.invoke(mode);
        } catch (final Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);

        registerReceiverHandler();
    }

    @Override
    public void onHostResume() {
        registerReceiverHandler();
    }

    @Override
    public void onHostPause() {
        unregisterReceiverHandler();
    }

    @Override
    public void onHostDestroy() {
        unregisterReceiverHandler();
    }
}