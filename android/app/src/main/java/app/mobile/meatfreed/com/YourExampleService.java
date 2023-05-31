package app.mobile.meatfreed.com;

import android.annotation.SuppressLint;
import androidx.annotation.NonNull;
import com.courier.android.notifications.RemoteMessageExtensionsKt;
import com.courier.android.service.CourierService;
import com.google.firebase.messaging.RemoteMessage;

@SuppressLint("MissingFirebaseInstanceTokenRefresh")
public class YourExampleService extends CourierService {
  @Override
  public void showNotification(@NonNull RemoteMessage message) {
    super.showNotification(message);

    RemoteMessageExtensionsKt.presentNotification(
      message,
      this,
      MainActivity.class,
      android.R.drawable.ic_dialog_info,
      "Notification Service"
    );
  }
}