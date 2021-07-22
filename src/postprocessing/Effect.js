import * as dat from 'dat.gui'
import * as POSTPROCESSING from "postprocessing"

export default class Postprocessing {
    constructor(camera, parameters, isDebug = true) {
        this.camera = camera
        this.parameters = parameters
        this.isDebug = isDebug

        if (this.isDebug)
            this.gui = new dat.GUI()
    }

    getEffectPass() {
        const bloomEffect = new POSTPROCESSING.BloomEffect(this.parameters.postprocessing.bloomEffect)
        bloomEffect.blendMode.opacity.value = this.parameters.postprocessing.bloomEffect.opacity
        
        const depthOfFieldEffect = new POSTPROCESSING.DepthOfFieldEffect(this.camera, this.parameters.postprocessing.depthOfFieldEffect)
        
        //const brightnessContrastEffect = new POSTPROCESSING.BrightnessContrastEffect(this.parameters.postprocessing.brightnessContrastEffect)

        if(this.isDebug)
            this._enableDebug(bloomEffect, depthOfFieldEffect)

        const effectPass = new POSTPROCESSING.EffectPass(this.camera, bloomEffect, depthOfFieldEffect)
        effectPass.renderToScreen = true

        return effectPass
    }

    _enableDebug(bloomEffect, depthOfFieldEffect) {
        const folderPostprocessingBloom = this.gui.addFolder('Postprocessing - Bloom')
        folderPostprocessingBloom.add(this.parameters.postprocessing.bloomEffect, 'opacity').onChange(value => bloomEffect.blendMode.opacity.value = value)
        
        const folderPostprocessingDepth = this.gui.addFolder('Postprocessing - Depth')
        folderPostprocessingDepth.add(this.parameters.postprocessing.depthOfFieldEffect, 'focusDistance').onChange(value => depthOfFieldEffect.circleOfConfusionMaterial.uniforms.focusDistance.value = value)
        folderPostprocessingDepth.add(this.parameters.postprocessing.depthOfFieldEffect, 'focalLength').onChange(value => depthOfFieldEffect.circleOfConfusionMaterial.uniforms.focalLength.value = value)
        folderPostprocessingDepth.add(this.parameters.postprocessing.depthOfFieldEffect, 'bokehScale').onChange(value => depthOfFieldEffect.bokehScale = value)
        folderPostprocessingDepth.add(this.parameters.postprocessing.depthOfFieldEffect, 'height').onChange(value => depthOfFieldEffect.resolution.height = value)

        // const folderPostprocessingBrightness = this.gui.addFolder('Postprocessing - Brightness')
        // folderPostprocessingBrightness.add(this.parameters.postprocessing.brightnessContrastEffect, 'brightness').onChange(value => brightnessContrastEffect.uniforms.get("brightness").value = value)
        // folderPostprocessingBrightness.add(this.parameters.postprocessing.brightnessContrastEffect, 'constrast').onChange(value => brightnessContrastEffect.uniforms.get("contrast").value = value)
        // folderPostprocessingBrightness.add(this.parameters.postprocessing.brightnessContrastEffect, 'opacity').onChange(value => brightnessContrastEffect.blendMode.opacity.value = value)
    }
}