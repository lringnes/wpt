// META: script=/common/get-host-info.sub.js
// META: script=./resources/common.js
// META: timeout=long
'use strict';

promise_test(async testCase => {
  const {windows, iframes} = await build([
    {
      id: 'cross-site-1',
      window_open: true,
      children: [
        {
          id: 'same-origin-2',
          window_open: true,
        },
        {
          id: 'same-origin-3',
        },
        {
          id: 'cross-origin-4',
        },
      ]
    },
  ]);
  try {
    const result = await performance.measureMemory();
    checkMeasureMemory(result, {
      allowed: [
        window.location.href,
      ],
      required: [
        window.location.href,
      ],
    });
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }
    assert_equals(error.name, 'SecurityError');
  }
}, 'performance.measureMemory does not leak URL of cross-site window.open.');
