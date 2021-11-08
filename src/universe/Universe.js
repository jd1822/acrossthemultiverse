import * as THREE from 'three'

export default class Universe {
    constructor (parameters, universeNumber) {
        this.parameters = parameters

        this.isReady = false
        this.universeNumber = this._getSanitizedUniverseNumber(universeNumber)
        this.owner = 'vooodoo.eth'
        this.matters = this.parameters.defaultMatters
        this.workersDistribution = this.parameters.defaultWorkersDistribution

        this.universeModifiers = {}
    }

    async generate() {
        await this._setUniverseModifiers()
        await this._applyUniverseModifiersToMatters()

        this.isReady = true
    }

    async generateRandom() {
        await this._setRandomUniverseModifiers()
        await this._applyUniverseModifiersToMatters()

        this.isReady = true
    }

    _getSanitizedUniverseNumber(universeNumber) {
        if(!universeNumber) {
            this.universeNumber = 1
            return this.universeNumber
        }

        // TODO check if universeNumber is a number
        // TODO check if universeNumber is in range 1-10000

        return universeNumber
    }

    async _setUniverseModifiers() {
        this.universeModifiers = {
            type: this.parameters.universeProperties.type.stable,
            age: this.parameters.universeProperties.age.child,
            diversity: this.parameters.universeProperties.diversity.superExtreme,
            singularity: this.parameters.universeProperties.singularity.blackHole,
            dominantRace: this.parameters.universeProperties.dominantRace.human
        }

        // TODO : should not be a switch but an async call to a db/cache
        // horrific harcoded values for now
        switch (this.universeNumber) {
            case 2:
                this.universeModifiers = {
                    type: this.parameters.universeProperties.type.bloom,
                    age: this.parameters.universeProperties.age.child,
                    diversity: this.parameters.universeProperties.diversity.superExtreme,
                    singularity: this.parameters.universeProperties.singularity.blackHole,
                    dominantRace: this.parameters.universeProperties.dominantRace.human
                }
                break

            case 3:
                this.universeModifiers = {
                    type: this.parameters.universeProperties.type.filaments,
                    age: this.parameters.universeProperties.age.child,
                    diversity: this.parameters.universeProperties.diversity.superExtreme,
                    singularity: this.parameters.universeProperties.singularity.blackHole,
                    dominantRace: this.parameters.universeProperties.dominantRace.human
                }
                break
            
            case 4:
                this.universeModifiers = {
                    type: this.parameters.universeProperties.type.ethereum,
                    age: this.parameters.universeProperties.age.child,
                    diversity: this.parameters.universeProperties.diversity.superExtreme,
                    singularity: this.parameters.universeProperties.singularity.blackHole,
                    dominantRace: this.parameters.universeProperties.dominantRace.human
                }
                break

            default:
                return
        }
    }

    async _setRandomUniverseModifiers() {
        const arrayType = Object.keys(this.parameters.universeProperties.type).filter(type => type !== 'epiphany')
        const randomType = this.parameters.universeProperties.type[arrayType[THREE.MathUtils.randInt(0, arrayType.length - 1)]]

        this.universeModifiers = {
            type: randomType,
            age: this.parameters.universeProperties.age.child,
            diversity: this.parameters.universeProperties.diversity.superExtreme,
            singularity: this.parameters.universeProperties.singularity.blackHole,
            dominantRace: this.parameters.universeProperties.dominantRace.human
        }
    }

    async _applyUniverseModifiersToMatters() {
        await this._applyTypeUniverseModifier()
        await this._applyAgeUniverseModifier()
        await this._applyDiversityUniverseModifier()
        await this._applySinguralityUniverseModifier()
        await this._applyDominantRaceUniverseModifier()
    }

    // Type modifiers

    async _applyTypeUniverseModifier() {
        switch (this.universeModifiers.type.id) {
            case 'stable':
                this._applyStableTypeUniverseModifier()
                break;

            case 'bloom':
                this._applyBloomTypeUniverseModifier()
                break;
            
            case 'filaments':
                this._applyFilamentsTypeUniverseModifier()
                break;

            case 'ethereum':
                this._applyEthereumTypeUniverseModifier()
                break;

            case 'epiphany':
                this._applyEpiphanyTypeUniverseModifier()
                break;
        
            default:
                // TODO : DELETE THIS should be in every cases
                this.matters.global.bloomIntensity = 2
                this.matters.global.clearColor = '#000000'
                console.log('Universe type TODO', this.universeModifiers.type.id)
                break;
        }
    }

    async _applyStableTypeUniverseModifier() {
        // matters modifiers
        this.matters.global.bloomIntensity = 2
        this.matters.global.clearColor = '#000000'
    }

    async _applyBloomTypeUniverseModifier() {
        // matters modifiers
        this.matters.global.bloomIntensity = 4
        this.matters.global.clearColor = '#000000'
        this.matters.starfield.vertices.bright = { min: 0.001, max: 0.01 }
        this.matters.starfield.material.size.pass = { min: 70, max: 80 }

        this.matters.nebula.cloud = { min: 0.20, max: 0.30 }
        this.matters.nebula.bright = { min: 0.0002, max: 0.002 }
        this.matters.nebula.vertices.emission.radiusSegments = 100
        this.matters.nebula.colors.in = [
        '#0C8D9F',
        '#F9EF2E',
        '#08F7FE',
        '#09FBD3',
        '#FE53BB',
        '#F5D300',
        '#FFACFC',
        '#F148FB',
        '#FF2281',
        '#FDC7D7',
        '#E8E500',
        '#00FECA',
        '#FFD300',
        '#4DEEEA'
        ]

        this.matters.nebula.colors.out = [
        '#E847AE',
        '#13CA91',
        '#FF9472',
        '#FFDEF3',
        '#FF61BE',
        '#F85125',
        '#EBF875',
        '#28CF75',
        '#FE6B35',
        '#CE0000',
        '#7FFF00',
        '#E92EFB',
        '#74ee15'
        ]

        this.matters.nebula.remnantColors.in = this.matters.nebula.colors.in
        this.matters.nebula.remnantColors.out = this.matters.nebula.colors.out

        // workers modifiers
        this.workersDistribution = [
            {
                chances: 38,
                type: 'Starfield',
                subtype: 'Globular'
            },
            {
                chances: 38,
                type: 'Nebula',
                subtype: 'Emission'
            },
            {
                chances: 10,
                type: 'Starfield',
                subtype: 'Open'
            },
            {
                chances: 8,
                type: 'Nebula',
                subtype: 'Remnant'
            },
            {
                chances: 5,
                type: 'Singularity',
                subtype: 'Blackhole'
            }
        ]
    }

    async _applyFilamentsTypeUniverseModifier() {
        // matters modifiers
        this.matters.global.bloomIntensity = 4
        this.matters.global.clearColor = '#000000'
        this.matters.galaxy.budget = 100000
        this.matters.galaxy.spiral.randomnessPower = 0.0002
        this.matters.galaxy.spiral.branchesAmplitude = 0.00008
        this.matters.galaxy.spiral.branches = { min: 300, max: 500 }
        this.matters.galaxy.material.size.pass = { min: 10, max: 20 }

        // workers modifiers
        this.workersDistribution = [
            {
                chances: 90,
                type: 'Galaxy',
                subtype: 'Spiral'
            },
            {
                chances: 10,
                type: 'Singularity',
                subtype: 'Blackhole'
            }
        ]
    }

    async _applyEthereumTypeUniverseModifier() {
        // matters modifiers
        this.matters.global.bloomIntensity = 2
        this.matters.global.clearColor = '#000F34'
        this.matters.starfield.colors = this.matters.nebula.colors.in
        this.matters.starfield.globularColors = this.matters.nebula.colors.out
        this.matters.starfield.material.size.pass = { min: 130, max: 130 }

        // workers modifiers
        this.workersDistribution = [
            {
                chances: 90,
                type: 'Starfield',
                subtype: 'Open'
            },
            {
                chances: 10,
                type: 'Singularity',
                subtype: 'Blackhole'
            }
        ]
    }

    async _applyEpiphanyTypeUniverseModifier() {
        // matters modifiers
        this.matters.global.bloomIntensity = 2
        this.matters.global.clearColor = '#000000'

        // workers modifiers
        this.workersDistribution = [
            {
                chances: 100,
                type: 'Starfield',
                subtype: 'Open'
            }
        ]
    }

    // Age modifiers
    async _applyAgeUniverseModifier() {
        // TODO : budget stars
    }

    // Diversity modifiers
    async _applyDiversityUniverseModifier() {
        // TODO : Color diversity
    }

    // Singularity modifiers
    async _applySinguralityUniverseModifier() {
        // TODO : color blackholes
    }

    // Dominant race modifiers
    async _applyDominantRaceUniverseModifier() {
        // TODO : add new spaceships
    }
}