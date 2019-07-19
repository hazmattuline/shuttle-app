package com.uline.shuttle.app.controller;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.controllers.ShuttleAppController;
import com.uline.shuttle.app.services.ShuttleAppService;
import com.uline.shuttle.app.services.impl.ShuttleAppServiceImpl;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;

public class ShuttleAppControllerTest {

  @InjectMocks private ShuttleAppController shuttleAppController;
  @Mock private ShuttleAppService shuttleAppService;
  @Mock private ShuttleAppClient shuttleAppClient;

  @Before
  public void setup() {

    shuttleAppController = new ShuttleAppController(shuttleAppService);
    shuttleAppService = new ShuttleAppServiceImpl(shuttleAppClient);
  }
}
