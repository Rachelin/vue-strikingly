<template>
    <div class="s-section-selector-item">

        <div v-if="sectionInfo.levelName" class="base selction-title-v4 highlight">
            {{sectionInfo.levelName}}
        </div>

        <div class="selction-title-v4" :class="highlight">
            <span class="fa icon {{sectionInfo.icon}}"></span>
            {{sectionInfo.name}}
        </div>

        <div class="selector section-button" @click="dispathAddSection">
            <div class="img-wrapper">
                <img class="lazy" src="//assets.strikingly.com/assets/v4/ion/sections/ecommerce/thumbnail/cover.png">
            </div>
            <div class="cover-wrapper">
                <div class="cover">
                    <div class="cover-inner">
                        <div class="info">
                            <div class="description">
                                {{sectionInfo.tip}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SectionSelectorItem',

    props: {
        sectionInfo: Object,
        level: Number
    },

    computed: {
        highlight () {
            if(this.sectionInfo.level > 1) {
                return 'highlight'
            }
        }
    },

    methods: {
        dispathAddSection () {
            this.$dispatch('add-new-section', this.sectionInfo.name, this.sectionInfo.component)
        }
    }
}
</script>

<style lang="less">
    // common
    .icon {
        display: inline-block;
        zoom: 1;
        margin-right: 2px;
    }
    .selction-title-v4 {
        padding: 5px 0;
        color: #333;
        border-radius: 3px 3px 0 0;
        position: relative;
        z-index: 1;
    }

    .highlight {
        color: #614b83;
        font-weight: bold;
        border-bottom: 1px solid rgba(97,75,131,0.5);
        padding-top: 5px;
    }
    
    .base.highlight {
        margin-bottom: 10px;
    }

    .selector.section-button {
        position: relative;
        height: auto;
        min-height: 80px;
        background-color: white;
        width: auto;
        cursor: pointer;
        margin-bottom: 15px;
        box-shadow: 0 0 2px 1px #ccc;
    }
    
    // ----------

    .img-wrapper {
        position: relative;
        overflow: hidden;
        img {
            width: 100%;
            display: block;
        }
    }
    .cover-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        .cover {
            width: 100%;
            height: 100%;
            position: absolute;
            min-height: 80px;
            left: 0;
            top: 0;
            opacity: 0;
            z-index: 1;
            filter: alpha(opacity=0);
            -webkit-transition: opacity .2s cubic-bezier(.7,0,.3,1);
            transition: opacity .2s cubic-bezier(.7,0,.3,1);
            background: rgba(0,0,0,0.8);
            display: table;
            color: #fff;

            .cover-inner {
                display: table-cell;
                padding: 10px 20px;
                vertical-align: middle;
            }

            .info {
                text-align: center;
                .description {
                    line-height: 1.35em;
                }
            }
        }
        .cover:hover {
            opacity: 1;
        }
    }
</style>