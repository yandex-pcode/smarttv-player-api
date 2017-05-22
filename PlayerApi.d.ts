/**
 * Возможные остояния плеера.
 */
export enum PlayerState {
    NOT_STARTED = -1,
    STOPPED = 0,
    PLAYING = 1,
    BUFFERING = 2,
    PAUSED = 3,
}

/**
 * Конфиг плейлиста, может быть строкой (ссылка на плейлист) или объектом.
 */
export interface ISourceConfig {
    /**
     * Плейлист.
     */
    stream: string;
    /**
     * Начать проигрывание с заданной секунды.
     */
    startFrom?: number;
    /**
     * Ссылка на постер (картинка-превью).
     */
    preview?: string;
    // TODO: DRM config
}

/**
 * Обработчики событий плеера.
 */
export interface IPublicHandlers {
    /**
     * Вызывается, когда длительность загруженного плейлиста изменилась
     * @param duration
     */
    onDurationChanged: (duration: number) => void;
    /**
     * Вызывается, когда текущее время проигрывания изменилось.
     * @param currentTime
     */
    onCurrentTimeChanged: (currentTime: number) => void;
    /**
     * Вызывается, когда состояние плеера изменилось.
     * @param state
     */
    onStateChanged: (state: PlayerState) => void;
    /**
     * Вызывается, когда произошла ошибка.
     * @param error
     */
    onError: (error: any) => void; // TODO: add error interface
}

/**
 * Параметры конфигурации плеера.
 */
export interface IPlayerParams {
    /**
     * Конфигурация плейлиста или ссылка на плейлист, который будет загружен в созданном плеере.
     */
    source: ISourceConfig | string;
    /**
     * Элемент/#id, в котором будет создан плеер.
     */
    element: string | Element;
    /**
     * Будет ли проигрывание начинаться автоматически после инициализации плеера.
     */
    autoplay?: boolean;
    /**
     * Объект с обработчиками событий плеера.
     */
    handlers?: Partial<IPublicHandlers>;
    // TODO: ad config
}

export abstract class PlayerApi {
    /**
     * Создает плеер с переданными параметрами.
     * @param params - Параметры нового плеера.
     * @returns Объект плеера.
     */
    constructor(params: IPlayerParams);
    /**
     * @returns Текущее состояние плеера.
     */
    public getState(): PlayerState;
    /**
     * @returns Текущее время воспроизведения в секундах (может быть не актуально для LIVE плейлистов).
     */
    public getCurrentTime(): number;
    /**
     * @returns Текущая продолжительность видео (может быть не актуально для LIVE и EVENT плейлистов).
     */
    public getDuration(): number;
    /**
     * @returns Текущее значение громкости (от 0 до 100).
     */
    public getVolume(): number;
    /**
     * Задает значение громкости (от 0 до 100).
     * @param volume - Новое значение громкости.
     * @returns `Promise`, который будет исполнен после установки нового значения громкости.
     */
    public setVolume(volume: number): Promise<void>;
    /**
     * Уничножает экземпляр плеера и все созданые им DOM-элементы.
     * @returns `Promise`, который будет исполнен после уничтожения плеера.
     */
    public destroy(): Promise<void>;
    /**
     * Начать проигрывание.
     * @returns `Promise`, который будет исполнен после начала проигрывания.
     */
    public play(): Promise<void>;
    /**
     * Поставить плеер на паузу.
     * @returns `Promise`, который будет исполнен после постановки плеера на паузу.
     */
    public pause(): Promise<void>;
    /**
     * Сменить текущую конфигурацию плейлиста.
     * @param config - Строка с ссылкой на плейлист или объект с конфигурацией плейлиста.
     * @returns `Promise`, который будет исполнен после загрузки нового плейлиста.
     */
    public setSource(config: ISourceConfig | string): Promise<void>;
}
