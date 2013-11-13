package com.example.phonegap_login;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.WebSettings.RenderPriority;

import com.flurry.android.FlurryAgent;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
		super.setIntegerProperty("loadUrlTimeoutValue", 60000);
		getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		super.loadUrl("file:///android_asset/www/views/index.html");
		this.appView.getSettings().setRenderPriority(RenderPriority.HIGH);
		this.appView.getSettings().setPluginState(android.webkit.WebSettings.PluginState.ON_DEMAND);
		
	}
	
	/*@Override
	protected void onStart() {
		super.onStart();
		FlurryAgent.onStartSession(this, "RTDC55WPZWXPPZGSZ7NQ");
	}

	@Override
	protected void onStop() {
		super.onStop();
		FlurryAgent.onEndSession(this);
	}*/
}
