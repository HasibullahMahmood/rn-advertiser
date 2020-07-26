package com.myapplication;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import android.media.AudioManager;
import android.content.Context;

import javax.annotation.Nullable;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.os.Handler;

public class RingtoneVolumeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static ReactApplicationContext reactContext;
    AudioManager myAudioManager;
    SettingsContentObserver mSettingsContentObserver;

    RingtoneVolumeModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

    }

    @Override
    public String getName() {
        return "RingtoneVolumeModule";
    }

    @ReactMethod
    public void getRingtoneCurrentVolume(final Callback errorCallback, final Callback successCallback) {
        try {

            successCallback.invoke(Integer.toString(getVolume()));
        } catch (final Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    private int getVolume() {
        myAudioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
        return myAudioManager.getStreamVolume(AudioManager.STREAM_RING);

    }

    public void registerContextObserver() {
        mSettingsContentObserver = new SettingsContentObserver(reactContext, new Handler());
        reactContext.getApplicationContext().getContentResolver()
                .registerContentObserver(android.provider.Settings.System.CONTENT_URI, true, mSettingsContentObserver);
    }

    public void volumeHandler() {
        int currentVolume = getVolume();

        WritableMap params = Arguments.createMap();
        params.putString("volume", Integer.toString(currentVolume));

        sendEvent(reactContext, "onVolumeChange", params);

    }

    private void unregisterContextObserver() {
        reactContext.getApplicationContext().getContentResolver().unregisterContentObserver(mSettingsContentObserver);
    }

    private void sendEvent(ReactApplicationContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);
        registerContextObserver();
    }

    @Override
    public void onHostResume() {
        registerContextObserver();
    }

    @Override
    public void onHostPause() {
        unregisterContextObserver();
    }

    @Override
    public void onHostDestroy() {
        unregisterContextObserver();
    }

}