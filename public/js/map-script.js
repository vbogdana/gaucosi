function MarkerClusterer(t, e, r) {
    this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = t, this.markers_ = [], this.clusters_ = [], this.sizes = [53, 56, 66, 78, 90], this.styles_ = [], this.ready_ = !1;
    var s = r || {};
    this.gridSize_ = s.gridSize || 60, this.minClusterSize_ = s.minimumClusterSize || 2, this.maxZoom_ = s.maxZoom || null, this.styles_ = s.styles || [], this.imagePath_ = s.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = s.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, void 0 != s.zoomOnClick && (this.zoomOnClick_ = s.zoomOnClick), this.averageCenter_ = !1, void 0 != s.averageCenter && (this.averageCenter_ = s.averageCenter), this.setupStyles_(), this.setMap(t), this.prevZoom_ = this.map_.getZoom();
    var o = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function () {
        var t = o.map_.getZoom();
        o.prevZoom_ != t && (o.prevZoom_ = t, o.resetViewport())
    }), google.maps.event.addListener(this.map_, "idle", function () {
        o.redraw()
    }), e && e.length && this.addMarkers(e, !1)
}

function Cluster(t) {
    this.markerClusterer_ = t, this.map_ = t.getMap(), this.gridSize_ = t.getGridSize(), this.minClusterSize_ = t.getMinClusterSize(), this.averageCenter_ = t.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, t.getStyles(), t.getGridSize())
}

function ClusterIcon(t, e, r) {
    t.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = e, this.padding_ = r || 0, this.cluster_ = t, this.center_ = null, this.map_ = t.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function (t, e) {
        return function (t) {
            for (var e in t.prototype) this.prototype[e] = t.prototype[e];
            return this
        }.apply(t, [e])
    }, MarkerClusterer.prototype.onAdd = function () {
        this.setReady_(!0)
    }, MarkerClusterer.prototype.draw = function () {}, MarkerClusterer.prototype.setupStyles_ = function () {
        if (!this.styles_.length)
            for (var t, e = 0; t = this.sizes[e]; e++) this.styles_.push({
                url: this.imagePath_ + (e + 1) + "." + this.imageExtension_,
                height: t,
                width: t
            })
    }, MarkerClusterer.prototype.fitMapToMarkers = function () {
        for (var t, e = this.getMarkers(), r = new google.maps.LatLngBounds, s = 0; t = e[s]; s++) r.extend(t.getPosition());
        this.map_.fitBounds(r)
    }, MarkerClusterer.prototype.setStyles = function (t) {
        this.styles_ = t
    }, MarkerClusterer.prototype.getStyles = function () {
        return this.styles_
    }, MarkerClusterer.prototype.isZoomOnClick = function () {
        return this.zoomOnClick_
    }, MarkerClusterer.prototype.isAverageCenter = function () {
        return this.averageCenter_
    }, MarkerClusterer.prototype.getMarkers = function () {
        return this.markers_
    }, MarkerClusterer.prototype.getTotalMarkers = function () {
        return this.markers_.length
    }, MarkerClusterer.prototype.setMaxZoom = function (t) {
        this.maxZoom_ = t
    }, MarkerClusterer.prototype.getMaxZoom = function () {
        return this.maxZoom_
    }, MarkerClusterer.prototype.calculator_ = function (t, e) {
        for (var r = 0, s = t.length, o = s; 0 !== o;) o = parseInt(o / 10, 10), r++;
        return r = Math.min(r, e), {
            text: s,
            index: r
        }
    }, MarkerClusterer.prototype.setCalculator = function (t) {
        this.calculator_ = t
    }, MarkerClusterer.prototype.getCalculator = function () {
        return this.calculator_
    }, MarkerClusterer.prototype.addMarkers = function (t, e) {
        for (var r, s = 0; r = t[s]; s++) this.pushMarkerTo_(r);
        e || this.redraw()
    }, MarkerClusterer.prototype.pushMarkerTo_ = function (t) {
        if (t.isAdded = !1, t.draggable) {
            var e = this;
            google.maps.event.addListener(t, "dragend", function () {
                t.isAdded = !1, e.repaint()
            })
        }
        this.markers_.push(t)
    }, MarkerClusterer.prototype.addMarker = function (t, e) {
        this.pushMarkerTo_(t), e || this.redraw()
    }, MarkerClusterer.prototype.removeMarker_ = function (t) {
        var e = -1;
        if (this.markers_.indexOf) e = this.markers_.indexOf(t);
        else
            for (var r, s = 0; r = this.markers_[s]; s++)
                if (r == t) {
                    e = s;
                    break
                } return -1 == e ? !1 : (t.setMap(null), this.markers_.splice(e, 1), !0)
    }, MarkerClusterer.prototype.removeMarker = function (t, e) {
        var r = this.removeMarker_(t);
        return !e && r ? (this.resetViewport(), this.redraw(), !0) : !1
    }, MarkerClusterer.prototype.removeMarkers = function (t, e) {
        for (var r, s = !1, o = 0; r = t[o]; o++) {
            var i = this.removeMarker_(r);
            s = s || i
        }
        return !e && s ? (this.resetViewport(), this.redraw(), !0) : void 0
    }, MarkerClusterer.prototype.setReady_ = function (t) {
        this.ready_ || (this.ready_ = t, this.createClusters_())
    }, MarkerClusterer.prototype.getTotalClusters = function () {
        return this.clusters_.length
    }, MarkerClusterer.prototype.getMap = function () {
        return this.map_
    }, MarkerClusterer.prototype.setMap = function (t) {
        this.map_ = t
    }, MarkerClusterer.prototype.getGridSize = function () {
        return this.gridSize_
    }, MarkerClusterer.prototype.setGridSize = function (t) {
        this.gridSize_ = t
    }, MarkerClusterer.prototype.getMinClusterSize = function () {
        return this.minClusterSize_
    }, MarkerClusterer.prototype.setMinClusterSize = function (t) {
        this.minClusterSize_ = t
    }, MarkerClusterer.prototype.getExtendedBounds = function (t) {
        var e = this.getProjection(),
            r = new google.maps.LatLng(t.getNorthEast().lat(), t.getNorthEast().lng()),
            s = new google.maps.LatLng(t.getSouthWest().lat(), t.getSouthWest().lng()),
            o = e.fromLatLngToDivPixel(r);
        o.x += this.gridSize_, o.y -= this.gridSize_;
        var i = e.fromLatLngToDivPixel(s);
        i.x -= this.gridSize_, i.y += this.gridSize_;
        var a = e.fromDivPixelToLatLng(o),
            n = e.fromDivPixelToLatLng(i);
        return t.extend(a), t.extend(n), t
    }, MarkerClusterer.prototype.isMarkerInBounds_ = function (t, e) {
        return e.contains(t.getPosition())
    }, MarkerClusterer.prototype.clearMarkers = function () {
        this.resetViewport(!0), this.markers_ = []
    }, MarkerClusterer.prototype.resetViewport = function (t) {
        for (var e, r = 0; e = this.clusters_[r]; r++) e.remove();
        for (var s, r = 0; s = this.markers_[r]; r++) s.isAdded = !1, t && s.setMap(null);
        this.clusters_ = []
    }, MarkerClusterer.prototype.repaint = function () {
        var t = this.clusters_.slice();
        this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function () {
            for (var e, r = 0; e = t[r]; r++) e.remove()
        }, 0)
    }, MarkerClusterer.prototype.redraw = function () {
        this.createClusters_()
    }, MarkerClusterer.prototype.distanceBetweenPoints_ = function (t, e) {
        if (!t || !e) return 0;
        var r = 6371,
            s = (e.lat() - t.lat()) * Math.PI / 180,
            o = (e.lng() - t.lng()) * Math.PI / 180,
            i = Math.sin(s / 2) * Math.sin(s / 2) + Math.cos(t.lat() * Math.PI / 180) * Math.cos(e.lat() * Math.PI / 180) * Math.sin(o / 2) * Math.sin(o / 2),
            a = 2 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i)),
            n = r * a;
        return n
    }, MarkerClusterer.prototype.addToClosestCluster_ = function (t) {
        for (var e, r = 4e4, s = null, o = (t.getPosition(), 0); e = this.clusters_[o]; o++) {
            var i = e.getCenter();
            if (i) {
                var a = this.distanceBetweenPoints_(i, t.getPosition());
                r > a && (r = a, s = e)
            }
        }
        if (s && s.isMarkerInClusterBounds(t)) s.addMarker(t);
        else {
            var e = new Cluster(this);
            e.addMarker(t), this.clusters_.push(e)
        }
    }, MarkerClusterer.prototype.createClusters_ = function () {
        if (this.ready_)
            for (var t, e = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), r = this.getExtendedBounds(e), s = 0; t = this.markers_[s]; s++) !t.isAdded && this.isMarkerInBounds_(t, r) && this.addToClosestCluster_(t)
    }, Cluster.prototype.isMarkerAlreadyAdded = function (t) {
        if (this.markers_.indexOf) return -1 != this.markers_.indexOf(t);
        for (var e, r = 0; e = this.markers_[r]; r++)
            if (e == t) return !0;
        return !1
    }, Cluster.prototype.addMarker = function (t) {
        if (this.isMarkerAlreadyAdded(t)) return !1;
        if (this.center_) {
            if (this.averageCenter_) {
                var e = this.markers_.length + 1,
                    r = (this.center_.lat() * (e - 1) + t.getPosition().lat()) / e,
                    s = (this.center_.lng() * (e - 1) + t.getPosition().lng()) / e;
                this.center_ = new google.maps.LatLng(r, s), this.calculateBounds_()
            }
        } else this.center_ = t.getPosition(), this.calculateBounds_();
        t.isAdded = !0, this.markers_.push(t);
        var o = this.markers_.length;
        if (o < this.minClusterSize_ && t.getMap() != this.map_ && t.setMap(this.map_), o == this.minClusterSize_)
            for (var i = 0; o > i; i++) this.markers_[i].setMap(null);
        return o >= this.minClusterSize_ && t.setMap(null), this.updateIcon(), !0
    }, Cluster.prototype.getMarkerClusterer = function () {
        return this.markerClusterer_
    }, Cluster.prototype.getBounds = function () {
        for (var t, e = new google.maps.LatLngBounds(this.center_, this.center_), r = this.getMarkers(), s = 0; t = r[s]; s++) e.extend(t.getPosition());
        return e
    }, Cluster.prototype.remove = function () {
        this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
    }, Cluster.prototype.getSize = function () {
        return this.markers_.length
    }, Cluster.prototype.getMarkers = function () {
        return this.markers_
    }, Cluster.prototype.getCenter = function () {
        return this.center_
    }, Cluster.prototype.calculateBounds_ = function () {
        var t = new google.maps.LatLngBounds(this.center_, this.center_);
        this.bounds_ = this.markerClusterer_.getExtendedBounds(t)
    }, Cluster.prototype.isMarkerInClusterBounds = function (t) {
        return this.bounds_.contains(t.getPosition())
    }, Cluster.prototype.getMap = function () {
        return this.map_
    }, Cluster.prototype.updateIcon = function () {
        var t = this.map_.getZoom(),
            e = this.markerClusterer_.getMaxZoom();
        if (e && t > e)
            for (var r, s = 0; r = this.markers_[s]; s++) r.setMap(this.map_);
        else {
            if (this.markers_.length < this.minClusterSize_) return void this.clusterIcon_.hide();
            var o = this.markerClusterer_.getStyles().length,
                i = this.markerClusterer_.getCalculator()(this.markers_, o);
            this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(i), this.clusterIcon_.show()
        }
    }, ClusterIcon.prototype.triggerClusterClick = function () {
        var t = this.cluster_.getMarkerClusterer();
        google.maps.event.trigger(t, "clusterclick", this.cluster_), t.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
    }, ClusterIcon.prototype.onAdd = function () {
        if (this.div_ = document.createElement("DIV"), this.visible_) {
            var t = this.getPosFromLatLng_(this.center_);
            this.div_.style.cssText = this.createCss(t), this.div_.innerHTML = this.sums_.text
        }
        var e = this.getPanes();
        e.overlayMouseTarget.appendChild(this.div_);
        var r = this;
        google.maps.event.addDomListener(this.div_, "click", function () {
            r.triggerClusterClick()
        })
    }, ClusterIcon.prototype.getPosFromLatLng_ = function (t) {
        var e = this.getProjection().fromLatLngToDivPixel(t);
        return e.x -= parseInt(this.width_ / 2, 10), e.y -= parseInt(this.height_ / 2, 10), e
    }, ClusterIcon.prototype.draw = function () {
        if (this.visible_) {
            var t = this.getPosFromLatLng_(this.center_);
            this.div_.style.top = t.y + "px", this.div_.style.left = t.x + "px"
        }
    }, ClusterIcon.prototype.hide = function () {
        this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
    }, ClusterIcon.prototype.show = function () {
        if (this.div_) {
            var t = this.getPosFromLatLng_(this.center_);
            this.div_.style.cssText = this.createCss(t), this.div_.style.display = ""
        }
        this.visible_ = !0
    }, ClusterIcon.prototype.remove = function () {
        this.setMap(null)
    }, ClusterIcon.prototype.onRemove = function () {
        this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
    }, ClusterIcon.prototype.setSums = function (t) {
        this.sums_ = t, this.text_ = t.text, this.index_ = t.index, this.div_ && (this.div_.innerHTML = t.text), this.useStyle()
    }, ClusterIcon.prototype.useStyle = function () {
        var t = Math.max(0, this.sums_.index - 1);
        t = Math.min(this.styles_.length - 1, t);
        var e = this.styles_[t];
        this.url_ = e.url, this.height_ = e.height, this.width_ = e.width, this.textColor_ = e.textColor, this.anchor_ = e.anchor, this.textSize_ = e.textSize, this.backgroundPosition_ = e.backgroundPosition
    }, ClusterIcon.prototype.setCenter = function (t) {
        this.center_ = t
    }, ClusterIcon.prototype.createCss = function (t) {
        var e = [];
        e.push("background-image:url(" + this.url_ + ");");
        var r = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
        e.push("background-position:" + r + ";"), "object" == typeof this.anchor_ ? (e.push("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? "height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;" : "height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), e.push("number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? "width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;" : "width:" + this.width_ + "px; text-align:center;")) : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
        var s = this.textColor_ ? this.textColor_ : "black",
            o = this.textSize_ ? this.textSize_ : 11;
        return e.push("cursor:pointer; top:" + t.y + "px; left:" + t.x + "px; color:" + s + "; position:absolute; font-size:" + o + "px; font-family:Arial,sans-serif; font-weight:bold"), e.join("")
    }, window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove,
    function (window) {
        var List = function () {
            function List() {
                this.items = []
            }
            return List.prototype = {
                add: function (item) {
                    this.items.push(item)
                },
                remove: function (item) {
                    var indexOf = this.items.indexOf(item); - 1 !== indexOf && this.items.splice(indexOf, 1)
                },
                find: function (callback, action) {
                    for (var callbackReturn, items = this.items, length = items.length, matches = [], i = 0; length > i; i++) callbackReturn = callback(items[i], i), callbackReturn && matches.push(items[i]);
                    return action && action.call(this, matches), matches
                }
            }, List
        }();
        List.create = function (params) {
            return new List(params)
        }, window.List = List
    }(window),
    function (window, google, List) {
        var Mainmap = function () {
            function Mainmap(element, opts) {
                this.gMap = new google.maps.Map(element, opts), this.markers = List.create(), opts.cluster && (this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.cluster.options)), opts.geocoder && (this.geocoder = new google.maps.Geocoder)
            }
            return Mainmap.prototype = {
                zoom: function (level) {
                    return level ? void this.gMap.setZoom(level) : this.gMap.getZoom()
                },
                _on: function (opts) {
                    var self = this;
                    google.maps.event.addListener(opts.obj, opts.event, function (e) {
                        opts.callback.call(self, e, opts.obj)
                    })
                },
                geocode: function (opts) {
                    this.geocoder.geocode({
                        address: opts.address
                    }, function (results, status) {
                        status === google.maps.GeocoderStatus.OK ? opts.success.call(this, results, status) : opts.error.call(this, status)
                    })
                },
                setPano: function (element, opts) {
                    var panorama = new google.maps.StreetViewPanorama(element, opts);
                    opts.events && this._attachEvents(panorama, opts.events), this.gMap.setStreetView(panorama)
                },
                addMarker: function (opts) {
                    var marker;
                    return opts.position = {
                        lat: opts.lat,
                        lng: opts.lng
                    }, marker = this._creatMarker(opts), this.markerClusterer && this.markerClusterer.addMarker(marker), this._addMarker(marker), opts.events && this._attachEvents(marker, opts.events), opts.content && this._on({
                        obj: marker,
                        event: "click",
                        callback: function () {
                            var infoWindow = new google.maps.InfoWindow({
                                content: opts.content
                            });
                            infoWindow.open(this.gMap, marker)
                        }
                    }), marker
                },
                _attachEvents: function (obj, events) {
                    var self = this;
                    events.forEach(function (event) {
                        self._on({
                            obj: obj,
                            event: event.name,
                            callback: event.callback
                        })
                    })
                },
                _addMarker: function (marker) {
                    this.markers.add(marker)
                },
                findBy: function (callback) {
                    return this.markers.find(callback)
                },
                removeBy: function (callback) {
                    var self = this;
                    self.markers.find(callback, function (markers) {
                        markers.forEach(function (marker) {
                            self.markerClusterer ? self.markerClusterer.removeMarker(marker) : marker.setMap(null)
                        })
                    })
                },
                _creatMarker: function (opts) {
                    return opts.map = this.gMap, new google.maps.Marker(opts)
                }
            }, Mainmap
        }();
        Mainmap.create = function (element, opts) {
            return new Mainmap(element, opts)
        }, window.Mainmap = Mainmap
    }(window, google, List),
    function (window, google, mainmap) {
        $(".gmap_canvas").each(function () {
            var $this = $(this),
                latitude = parseFloat($this.attr("data-latitude")),
                longitude = parseFloat($this.attr("data-longitude")),
                c = ($this.attr("class"), new google.maps.LatLng(latitude, longitude)),
                main_color = "#2d313f",
                saturation_value= -20,
                brightness_value= 5,
                styles0 = [{
                    stylers: [{
                        gamma: 2.42
                    }, {
                        saturation: -58
                    }, {
                        hue: "#007fff"
                    }, {
                        lightness: -5
                    }]
                }, {
                    featureType: "road.highway",
                    stylers: [{
                        saturation: -62
                    }, {
                        lightness: -2
                    }]
                }, {
                    featureType: "poi",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "water",
                    stylers: [{
                        visibility: "on"
                    }, {
                        saturation: -67
                    }, {
                        lightness: -2
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }],
                styles1 = [{
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{
                        saturation: 36
                    }, {
                        color: "#000000"
                    }, {
                        lightness: 40
                    }]
                }, {
                    featureType: "all",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#000000"
                    }, {
                        lightness: 16
                    }]
                }, {
                    featureType: "all",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 20
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }, {
                        weight: 1.2
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 20
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 21
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 29
                    }, {
                        weight: .2
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 18
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 16
                    }]
                }, {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 19
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }]
                }],
                styles2 = [{
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "saturation": 36
                        }, {
                            "color": "#333333"
                        }, {
                            "lightness": 40
                        }]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#ffffff"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 20
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 17
                        }, {
                            "weight": 1.2
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }, {
                            "lightness": 20
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }, {
                            "lightness": 21
                        }]
                    }, {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#dedede"
                        }, {
                            "lightness": 21
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#e3e3e3"
                        }, {
                            "lightness": 17
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#eeeeee"
                        }, {
                            "lightness": 29
                        }, {
                            "weight": 0.2
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }, {
                            "lightness": 18
                        }]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }, {
                            "lightness": 19
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "lightness": 17
                        }, {
                            "visibility": "on"
                        }, {
                            "color": "#ffffff"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }],
                    styles3= [ 
            {
                //set saturation for the labels on the map
                elementType: "labels",
                stylers: [
                    {saturation: saturation_value}
                ]
            },  
            {   //poi stands for point of interest - don't show these lables on the map 
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                //don't show highways lables on the map
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                    {visibility: "off"}
                ]
            }, 
            {   
                //don't show local road lables on the map
                featureType: "road.local", 
                elementType: "labels.icon", 
                stylers: [
                    {visibility: "off"} 
                ] 
            },
            { 
                //don't show arterial road lables on the map
                featureType: "road.arterial", 
                elementType: "labels.icon", 
                stylers: [
                    {visibility: "off"}
                ] 
            },
            {
                //don't show road lables on the map
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                    {visibility: "off"}
                ]
            }, 
            //style different elements on the map
            { 
                featureType: "transit", 
                elementType: "geometry.fill", 
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            }, 
            {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.government",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.sport_complex",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.attraction",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.business",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "transit",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "transit.station",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "landscape",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]

            },
            {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            }, 
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" }, 
                    { lightness: brightness_value }, 
                    { saturation: saturation_value }
                ]
            }],
                   
                stylys = [styles0, styles1, styles2,styles3];
            mainmap.MAP_OPTIONS = {
                center: c,
                zoom: 14,
                disableDefaultUI: !1,
                scrollwheel: !1,
                draggable: !0,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM,
                    style: google.maps.ZoomControlStyle.DEFAULT
                },
                panControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                cluster: !0,
                geocoder: !0,
                styles: stylys[$this.data("style-num")]
            }
        })
    }(window, google, window.Mainmap || (window.Mainmap = {})),
    function (window, Mainmap) {
        $.widget("mainmap.mainmap", {
            options: {},
            _create: function () {
                var element = this.element[0],
                    options = this.options;
                this.map = Mainmap.create(element, options)
            },
            _refresh: function () {},
            addMarker: function (opts) {
                var self = this;
                opts.location ? this.map.geocode({
                    address: opts.location,
                    success: function (results) {
                        results.forEach(function (result) {
                            opts.lat = result.geometry.location.lat(), opts.lng = result.geometry.location.lng(), self.map.addMarker(opts)
                        })
                    },
                    error: function (status) {
                        console.error(status)
                    }
                }) : this.map.addMarker(opts)
            },
            findMarkers: function (callback) {
                return this.map.findBy(callback)
            },
            removeMarkers: function (callback) {
                this.map.removeBy(callback)
            },
            markers: function () {
                return this.map.markers.items
            },
            setPano: function (selector, opts) {
                var elements = $(selector),
                    self = this;
                $.each(elements, function (key, element) {
                    self.map.setPano(element, opts)
                })
            },
            _destroy: function () {},
            _setOptions: function () {
                this._superApply(arguments), this._refresh()
            },
            _setOption: function (key, value) {
                this._super(key, value)
            }
        })
    }(window, Mainmap),
    function (window, $) {
        $(".gmap_canvas").each(function () {
            {
                var $this = $(this),
                    $mainmap = $this.mainmap(Mainmap.MAP_OPTIONS);
                new google.maps.Geocoder
            }
            $mainmap.mainmap("addMarker", {
                location: $this.data("marker-location1"),
                draggable: !1,
                icon: "images/location-pointer.png",
                visible: $this.data("marker1-visible"),
                content: $this.data("marker1-content"),
                id: 1
            }), $mainmap.mainmap("addMarker", {
                location: $this.data("marker-location2"),
                draggable: !1,
                icon: "images/location-pointer.png",
                visible: $this.data("marker2-visible"),
                content: $this.data("marker2-content"),
                id: 2
            })
        })
    }(window, jQuery);
