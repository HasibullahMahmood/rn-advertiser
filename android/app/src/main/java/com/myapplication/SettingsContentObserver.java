package com.myapplication;

import android.database.ContentObserver;
import android.os.Handler;
import com.facebook.react.bridge.ReactApplicationContext;

public class SettingsContentObserver extends ContentObserver {

    ReactApplicationContext context;
    RingtoneVolumeModule ringtoneVolumeModule;

    public SettingsContentObserver(ReactApplicationContext c, Handler handler) {
        super(handler);
        context = c;
        ringtoneVolumeModule = new RingtoneVolumeModule(context);
        ringtoneVolumeModule.volumeHandler();
    }

    @Override
    public void onChange(boolean selfChange) {
        super.onChange(selfChange);
        ringtoneVolumeModule.volumeHandler();
    }
}
