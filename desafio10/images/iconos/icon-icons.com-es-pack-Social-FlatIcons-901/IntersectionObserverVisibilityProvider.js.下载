///<reference path="../../Infra/Infra.js" />
///<reference path="../../Infra/Logging.js" />
///<reference path="../../Adaptor/StdAdaptor.js" />
///<reference path="../../Adaptor/Adaptor.js" />
///<reference path="../../Adaptor/Browser.js" />
///<reference path="../../Positioning/Positioning.js" />
///<reference path="../../Enums.js" />
///<reference path="../../Events.js" />
///<reference path="../InteractionData.js" />
///<reference path="../InteractionUtil.js"/>
///<reference path="../InteractionObjects.js" />
///<reference path="../StdInteractionManager.js" />
///<reference path="../InteractionManager.js" />
///<reference path="../../Initializer.js" />
EBG.declareNamespace("RichModules");

EBG.RichModules.IntersectionObserverVisibilityProvider = function (resourceObjId, adConfig, options) {
    /// <summary>
    /// IntersectionObserverVisibilityProvider - use IntersectionObserver to measure viewability in unfreindly iframes
    /// ad visibility.
    /// </summary>
    /// <param name="resourceObjId" type="String">Resource Object id which the visibility provider calculates</param>
    /// <param name="adConfig" type="Object">Holds the configuration of the Ad.</param>
    EBG.callSuperConstructor(EBG.RichModules.IntersectionObserverVisibilityProvider, this, [resourceObjId, adConfig, options]);
    this._initObserver();
};

EBG.RichModules.IntersectionObserverVisibilityProvider.prototype = {
    name: "IntersectionObserver",
    //_precision is number between 0 and 1 used to etermine the thresholds passed to the intersectionObserver. 
    //0.01 will give updates for each 1% of change in visibility.
    //0.1 will give updates for each 10% change in visibility.
    _precision: 0.05,
    _observer: null,
    _lastPercentage: null,
    _lastViewport: null,

    _subscribeToEvents: function () {
        /// <summary>
        /// Subscribe the provider for some events for recalculating visibility
        /// </summary>
        EBG.log.debug("Subscribing to BrowserVisibilityProvider Events");

        EBG.callSuperFunction(EBG.RichModules.IntersectionObserverVisibilityProvider, this, "_subscribeToEvents");

        //get the page visibility events. 
        // NB GeometricProvider also subscribes these, and the other providers that need them inherit from Geo. 
        // But the other providers don't need them due to using setTimouts or mouseEvents, so it doesn't make sense to move them to BasicProvider.
        // Intersection is the only provider that needs these events that doesn't also need all the other stuff in Geometric.
        var evnt = new EBG.Events.EventSubscription(EBG.Events.EventNames.PAGE_HIDDEN, this._pageHiddenHandler, this);
        evnt.isDocumentEvent = true;
        EBG.eventMgr.subscribeToEvent(evnt);

        evnt = new EBG.Events.EventSubscription(EBG.Events.EventNames.PAGE_VISIBLE, this._pageVisibleHandler, this);
        evnt.isDocumentEvent = true;
        EBG.eventMgr.subscribeToEvent(evnt);
        
    },
    _pageVisibleHandler: function () {
        /// <summary>
        /// This is the visible event handler. 
        /// In this case we should resume all timers 
        /// </summary>

        EBG.log.debug("Visibility Provider, visible event, restart visibility check");
        this._triggerVisibilityCheck();
    },
    _pageHiddenHandler: function () {
        /// <summary>
        /// This is the hidden event handler. 
        /// </summary>

        this._dispatchVisibilityHidden();

        // Oh yeah .... the ad isn't considered to be visible... So it might be a good idea to update visibility percentage to 0
        if (this.adConfig.visibility.mode == EBG.VisibilityMode.ENHANCED_MODE) {
            var viewPort = this._getViewPortMetrics();
            this._dispatchCheckVisibility({ percentage: 0, viewPort: viewPort }); // Overrides result to 0 (hence _calculateVisibilityPrecentage is not called)
        }
    },

    _initObserver: function () {
        if (window.IntersectionObserver) {
            var options = { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1] };
            this._observer = new IntersectionObserver(this._handleChanges.bind(this), options);
        }
        if (this.adConfig.actualServingMode == EBG.Adaptors.ServingMode.IFRAME && window.context && context.observeIntersection && EBG.isFunc(context.observeIntersection)) {
            context.observeIntersection(this._handleAMPChanges.bind(this));
        }
    },

    _handleChanges: function (changes) {
        //just use the last entry in the sequence if there's ever more than one. Anyway they're only a few milliseconds apart, at least on Chrome... so far...
        var entry = changes[changes.length - 1];

        this._lastPercentage = Math.round(entry.intersectionRatio * 100);
        if (entry.rootBounds) {
            this._lastViewport = entry.rootBounds;
        }
        this._triggerVisibilityCheck();
    },

    _handleAMPChanges: function (changes) {
        //just use the last entry in the sequence if there's ever more than one. Anyway they're only a few milliseconds apart, at least on Chrome... so far...
        var entry = changes[changes.length - 1];

        // only use AMP-provided metrics if we can't get our own directly from the browser.
        if (!this._observer) {
            this._lastPercentage = Math.round(entry.intersectionRatio * 100);
        }
        // IntersectionObserver can't get rootBounds in unfriendly iframe, but AMP can, because it has access to the top window.
        this._lastViewport = entry.rootBounds;

        this._triggerVisibilityCheck();
    },

    _calculateVisibilityPercentage: function () {
        /// <summary>
        /// Calculate resourse visiblity percentage.
        /// </summary>
        /// <param name="properties" type="Object">Properties that would take place in the visility calculation. Optional, if null or undefined values are placed of the adConfig.</param>
        /// <returns type="Number">Returns the visibility percentage (0 - 100)</returns>
        try {
            return EBG.adaptor.isPageVisible() ? this._lastPercentage : 0;
        } catch (e) {
            return 0;
        }
    },

    updateResourceObjId: function (resourceObjId) {
        /// <summary>
        /// In case a new resource is added to the DOM (Polite Banner is a good example), the resource Id should be changed for the visibility manager
        /// and the visibility provider. Update includes browser event resubscription.
        /// </summary>
        /// <param name="resourceObjId" type="String">Resource Object id which the visibility manager takes tracks on. Any previous object id is discarded</param>
        this._observer.unobserve(this._res);
        //or maybe .disconnect() would be better, if the observer only observes one elem

        EBG.callSuperFunction(EBG.RichModules.IntersectionObserverVisibilityProvider, this, "updateResourceObjId", [resourceObjId]);
        this._observer.observe(this._res);
    },

    _getViewPortRect: function () {
        /// <summary>
        /// Retrieves client's view area. The calculation of view port is different regarding the browser version. On version 9 and above we are able to
        /// get the exact viewport the client sees. On older versions, due to browser limitation, we take a portion close the the screen resolution and assum this is the
        /// actual view port (this assumption is based on the common sense most browsing is made when window is fully sized).
        /// The calculation is cropped if the screen crosses the screen resolution, so only the porition of window that is actualy in user's sight is returned
        ///</summary>
        /// <returns type="Object">Client area's height & width</returns>
        /// <returns type="Object">The coordinates (top,left,bottom,right) of the user view area (view port)</returns> 

        return this._lastViewport;
    },

    _getViewPortMetrics: function () {
        /// <summary>
        /// Retrieves client's view area
        ///</summary>
        /// <returns type="Object">Client area's height & width</returns>
        var rect = this._getViewPortRect();
        if (rect) {
            return { Height: rect.height, Width: rect.width };
        }

        return null;
    },

    _isVisible: function () {
        /// <summary>
        /// Detemin if the ad is visible (e.g. the calclation percentage is over 0%). adConfig properties can be overriden by input properties
        /// </summary>
        /// <return type="Boolean">"true" if the resource is visible, "false" otherwise</return value> 
        return !!this._calculateVisibilityPercentage();
    },

    _checkVisibility: function () {
        /// <summary>
        /// Starts the provider activity. From that point the visibility provider will start
        /// measuring resource visibility and communicate with the visibility manager.
        /// </summary>
        /// <return type="Object">JSON object with all calculation properties result</return value> 

        var res = this._calculateVisibilityResult();
        if (this._lastPercentage != res.percentage || (!this._lastViewport || this._lastViewport.Height != res.viewPort.Height || this._lastViewport.Width != res.viewPort.Width)) {
            this._dispatchCheckVisibility(res);
            this._lastPercentage = res.percentage;
            this._lastViewport = res.viewPort;
        }
    },

    start: function () {
        /// <summary>
        /// Starts the provider activity. From that point the visibility provider will start
        /// measuring resource visibility and communicate with the visibility manager.
        /// </summary>
        /// <return type="Object">JSON object with all calculation properties result</return value> 

        //IntersectionObserver will tell us when the elem comes into view, but will not say anything until then if it loads out of view
        this._lastPercentage = 0;

        EBG.callSuperFunction(EBG.RichModules.IntersectionObserverVisibilityProvider, this, "start");
        this._observer.observe(this._res);
    }
};

EBG.declareClass(EBG.RichModules.IntersectionObserverVisibilityProvider, EBG.RichModules.BasicVisibilityProvider);