package com.nuvoteapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnta.clear.ClearCachePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.vydia.RNUploader.UploaderReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ClearCachePackage(),
            new RNDeviceInfo(),
            new RNCameraPackage(),
            new RNFileViewerPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeLocalizationPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new UploaderReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
