import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:flutter/cupertino.dart'; // For the CupertinoAlertDialog
import 'package:fluttertoast/fluttertoast.dart'; // For showing toast messages

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late GoogleMapController mapController;
  Location location = Location();
  LatLng? _currentLocation;
  Set<Marker> _markers = {}; // Use a Set to store all markers
  bool _showCrosshair = false;
  String _fabLabel = "Defect"; // Track the label of the floating button

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    // Check if location services are enabled
    bool serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) return;
    }

    // Check for location permissions
    PermissionStatus permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) return;
    }

    // Get the user's current location
    final userLocation = await location.getLocation();
    setState(() {
      _currentLocation = LatLng(userLocation.latitude!, userLocation.longitude!);
    });

    // Move the map to the user's location
    if (mapController != null && _currentLocation != null) {
      mapController.animateCamera(
        CameraUpdate.newLatLng(_currentLocation!),
      );
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    if (_currentLocation != null) {
      mapController.animateCamera(
        CameraUpdate.newLatLng(_currentLocation!),
      );
    }
  }

  Future<void> _showSeverityDialog(LatLng center) async {
    debugPrint("Opening severity dialog..."); // Debug log to check if dialog is opened
    String? selectedSeverity = await showDialog<String>(
      context: context,
      builder: (BuildContext context) {
        return CupertinoAlertDialog(
          title: const Text("Select Severity"),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: const [
              Text("Please select the severity of the defect:"),
            ],
          ),
          actions: [
            CupertinoDialogAction(
              child: const Text("Low"),
              onPressed: () => Navigator.pop(context, "Low"),
            ),
            CupertinoDialogAction(
              child: const Text("Medium"),
              onPressed: () => Navigator.pop(context, "Medium"),
            ),
            CupertinoDialogAction(
              child: const Text("High"),
              onPressed: () => Navigator.pop(context, "High"),
            ),
          ],
        );
      },
    );

    if (selectedSeverity != null) {
      debugPrint("Selected severity: $selectedSeverity"); // Debug log to check selected severity
      setState(() {
        _markers.clear(); // Clear any existing marker
        _markers.add(
          Marker(
            markerId: MarkerId("center_marker_${DateTime.now().millisecondsSinceEpoch}"),
            position: center,
            infoWindow: InfoWindow(title: "Severity: $selectedSeverity"),
          ),
        );
        _showCrosshair = false; // Hide the crosshair after adding the marker
        _fabLabel = "Defect"; // Switch back to "Defect"
      });

      // Show a message to the user after state update
      Fluttertoast.showToast(
        msg: "Defect with severity '$selectedSeverity' has been sent for review to the authorities.",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.black,
        textColor: Colors.white,
        fontSize: 16.0,
      ).catchError((error) {
        debugPrint("Error showing toast: $error"); // Log any errors
      });
    } else {
      debugPrint("No severity selected."); // Debug log if no severity is selected
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
            title: const Text("Map", style: TextStyle(color: Colors.white)),
            backgroundColor: Colors.blue[900],
          ),
      body: Stack(
        children: [
          GoogleMap(
            zoomControlsEnabled: false,
            onMapCreated: _onMapCreated,
            initialCameraPosition: CameraPosition(
              target: _currentLocation ?? LatLng(32.9837, 71.4557),
              zoom: 15.0,
            ),
            myLocationEnabled: true,
            myLocationButtonEnabled: true,
            markers: _markers, // Pass the Set of markers to the map
          ),
          // Crosshair in the center of the screen
          Center(
            child: Visibility(
              visible: _showCrosshair, // Toggle visibility
              child: const Icon(
                Icons.add, // Crosshair icon
                size: 40,
                color: Colors.red,
              ),
            ),
          ),
          // Cancel icon in the top left
          Positioned(
            top: 16,
            left: 16,
            child: Visibility(
              visible: _showCrosshair, // Show only when crosshair is visible
              child: IconButton(
                icon: const Icon(Icons.cancel,  size: 40),
                onPressed: () {
                  setState(() {
                    _showCrosshair = false; // Hide crosshair
                    _fabLabel = "Defect"; // Reset floating button label
                  });
                },
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          debugPrint("FloatingActionButton pressed. Current label: $_fabLabel"); // Debug log
          if (_fabLabel == "Add") {
            LatLngBounds visibleRegion = await mapController.getVisibleRegion();
            LatLng center = LatLng(
              (visibleRegion.northeast.latitude + visibleRegion.southwest.latitude) / 2,
              (visibleRegion.northeast.longitude + visibleRegion.southwest.longitude) / 2,
            );

            await _showSeverityDialog(center); // Show the severity dialog
          } else {
            setState(() {
              _showCrosshair = !_showCrosshair; // Toggle crosshair visibility
              _fabLabel = _showCrosshair ? "Add" : "Defect"; // Update the label
            });
          }
        },
        label: Row(
          children: [
            const Icon(Icons.add_rounded),
            const SizedBox(width: 5),
            Text(_fabLabel), // Use the dynamic label
          ],
        ),
      ),
    );
  }
}